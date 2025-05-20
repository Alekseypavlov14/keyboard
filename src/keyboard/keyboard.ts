import { createSelectorFilter } from './utils/create-selector-filter'
import { Callback } from './types/callback'
import { Selector } from './types/selector'
import { Handler } from './types/handler'
import { Name } from './types/name'

export class Keyboard {
  private handlers: Map<Selector, Handler[]> = new Map<Selector, Handler[]>()

  // Sets a handler (anonymous) for "hot key" selector 
  // Removes all the other handlers for this "hot key"
  // Returns callback to be applied (framework independent)
  setHandler(selector: Selector, callback: Callback<KeyboardEvent>) {
    const handler: Handler = [ this.getNewUniqueHandlerName(), callback ]
    this.handlers.set(selector, [ handler ])
    
    return this.createHandlerCallback(selector)
  }

  // Adds new handler (anonymous) for the "hot key" selector
  // Returns callback to be applied (framework independent)
  addHandler(selector: Selector, callback: Callback<KeyboardEvent>) {
    const handler: Handler = [ this.getNewUniqueHandlerName(), callback ]

    const handlers = this.handlers.get(selector) ?? []
    handlers.push(handler)

    this.handlers.set(selector, handlers)
    
    return this.createHandlerCallback(selector)
  }

  // Sets a handler (named) for the "hot key" selector
  // Removes all the other handlers for this "hot key"
  // Returns callback to be applied (framework independent)
  setNamedHandler(selector: Selector, name: Name, callback: Callback<KeyboardEvent>) {
    const handler: Handler = [ name, callback ]
    this.handlers.set(selector, [ handler ])
    
    return this.createHandlerCallback(selector)
  }

  // Adds new handler (named) for the "hot key" selector
  // Returns callback to be applied (framework independent)
  addNamedHandler(selector: Selector, name: Name, callback: Callback<KeyboardEvent>) {
    const handler: Handler = [ name, callback ]

    const handlers = this.handlers.get(selector) ?? []
    handlers.push(handler)

    this.handlers.set(selector, handlers)
    
    return this.createHandlerCallback(selector)
  }

  // returns the callback that will be applied by client code (framework independent)
  private createHandlerCallback(selector: Selector): Callback<KeyboardEvent> {
    return (event: KeyboardEvent) => {
      // get all handlers of this "hot key"
      const handlers = this.handlers.get(selector)
      if (!handlers?.length) return

      // filter to call handlers ONLY for specified "hot key" selector
      const selectorFilter = createSelectorFilter(selector)
      if (!selectorFilter(event)) return
      
      // extract callbacks
      const callbacks = handlers.map<Callback<KeyboardEvent>>(([ _, callback ]) => callback)

      // execute handlers callbacks
      callbacks.forEach(callback => callback(event))
    }
  }

  // Removes all handlers by "hot key" selector
  removeHandlers(selector: Selector) {
    return this.handlers.delete(selector)
  }

  // Removes named handler for specified "hot key"
  removeNamedHandler(selector: Selector, name: Name) {
    const handlers = this.handlers.get(selector) ?? []
    const filteredHandlers = handlers.filter(([ handlerName ]) => name !== handlerName)
    this.handlers.set(selector, filteredHandlers)
  }

  // Removes named handler from ALL "hot keys"
  removeNamedHandlersForAllSelectors(name: Name) {
    this.handlers.forEach((handlers, selector) => {
      const filteredHandlers = handlers.filter(([ handlerName ]) => name !== handlerName)
      this.handlers.set(selector, filteredHandlers)
    })
  }

  // get unique name for anonymous handler
  private getNewUniqueHandlerName() {
    return Symbol()
  }
}

export const keyboard = new Keyboard()
