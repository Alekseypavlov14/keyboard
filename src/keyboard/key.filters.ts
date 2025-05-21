import { Filter } from './types/filter'
import { Key } from './types/key'

export const modifierKeys: Key[] = [
  'ctrl',
  'shift',
  'alt',
  'option',
  'win',
  'meta',
  'cmd',
] 

// represents entry for config
export interface ModifierKeyConfig {
  // list of names of modifier for different OS
  keys: Key[]
  // filter generator.
  generate: (state: boolean) => Filter
}

// list of modifier keys
export const modifierKeysConfigs: ModifierKeyConfig[] = [
  // Control key
  {
    keys: ['ctrl'],
    generate: (state) => (e) => e.ctrlKey === state
  },
  // Shift key
  {
    keys: ['shift'],
    generate: (state) => (e) => e.shiftKey === state
  },
  // Alt/Option key 
  {
    keys: ['alt', 'option'],
    generate: (state) => (e) => e.altKey === state,
  },
  // Windows/Meta/Command key
  {
    keys: ['win', 'meta', 'cmd'],
    generate: (state) => (e) => e.metaKey === state
  }
]

// for regular keys
export function getRegularKeyFilter(key: Key) {
  return (e: KeyboardEvent) => e.key.toLowerCase() === key
}
