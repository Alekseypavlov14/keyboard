# @oleksii-pavlov/keyboard

A flexible, TypeScript-first library for handling **keyboard events** and **hotkey combinations** in a **framework-agnostic** way. Create composable handlers for hotkey selectors like `Ctrl+C`, `Alt+Enter`, or `Cmd+Shift+Z`.

- ✅ Declarative Hotkey definitions `Ctrl+C`, `Ctrl+Alt+Enter`
- ✅ Pluggable into any environment (DOM, React, Vue, etc.)
- ✅ Support for multiple named/anonymous handlers per hotkey
- ✅ Built-in alias mapping (`Cmd`, `Option`, `Esc` etc.)
- ✅ Use on `keydown`, `keyup`, or `keypress` — your choice

---

## 📦 Installation

```bash
npm install @oleksii-pavlov/keyboard
```

---

## ✨ Usage

### Import

```ts
import { keyboard } from '@oleksii-pavlov/keyboard'
```

---

### 🧠 Selector Syntax

Selectors are simple strings like:

* `"Ctrl+S"`
* `"Cmd+Shift+K"`
* `"Alt+Enter"`
* `"Plus"` (matches the `+` key)
* `"Minus"` (matches the `-` key)

The full list of aliases is:

| Alias                    | Normalized As |
| ------------------------ | ------------- |
| `Ctrl`, `Control`        | `ctrl`        |
| `Shift`                  | `shift`       |
| `Alt`, `Option`          | `alt`         |
| `Meta`, `Cmd`, `Command` | `meta`        |
| `Plus`                   | `+`           |
| `Minus`                  | `-`           |
| `Esc`, `Escape`          | `escape`      |
| `Enter`, `Return`        | `enter`       |
| `Space`                  | `' '`         |
| `Up`                     | `arrowup`     |
| `Down`                   | `arrowdown`   |
| `Left`                   | `arrowleft`   |
| `Right`                  | `arrowright`  |

---

## 🔌 Framework-Agnostic Integration

The handlers you create are just pure callbacks that accept a `KeyboardEvent` — bind them wherever and however you like:

### ✅ Vanilla JavaScript

```ts
// create handler with Hotkey and callback
const handler = keyboard.setHandler('Ctrl+S', (e) => {
  e.preventDefault()
  alert('Saved!')
})

// apply handler wherever you need
window.addEventListener('keydown', handler) // or 'keyup', 'keypress'
```

### ✅ React

```tsx
useEffect(() => {
  const handler = keyboard.setHandler('Ctrl+S', (e) => {
    e.preventDefault()
    alert('Saved from React!')
  })

  window.addEventListener('keydown', handler)
  return () => window.removeEventListener('keydown', handler)
}, [])
```

### ✅ Element level

```ts
import { keyboard } from '@oleksii-pavlov/keyboard'

const input = document.querySelector('input')!

// Handle Ctrl+Enter inside the input
const handler = keyboard.setHandler('Ctrl+Enter', (e) => {
  alert('Submitted from input!')
})

// apply handler for the input
input.addEventListener('keydown', handler)
```

---

## 🧩 API Overview

### `keyboard.setHandler(selector, callback)`

Replaces all handlers for the given selector with a new **anonymous** one. Use this for global hotkeys to prevent conflicts.

```ts
keyboard.setHandler('Ctrl+S', (e) => {
  console.log('Saved!')
})
```

---

### `keyboard.addHandler(selector, callback)`

Adds an **anonymous** handler without removing existing ones.

---

### `keyboard.setNamedHandler(selector, name, callback)`

Sets a **named handler** (removing others for that selector/hotkey).

```ts
keyboard.setNamedHandler('Ctrl+Z', 'undo', (e) => {
  console.log('Undo!')
})
```

---

### `keyboard.addNamedHandler(selector, name, callback)`

Adds a **named handler** to the selector.

```ts
keyboard.addNamedHandler('Ctrl+Z', 'customUndo', (e) => {
  console.log('Custom Undo (override behavior)')
})
```

---

### `keyboard.removeHandlers(selector)`

Removes **all** handlers for the selector.

---

### `keyboard.removeNamedHandler(selector, name)`

Removes a specific named handler from given selector.

---

### `keyboard.removeNamedHandlersForAllSelectors(name)`

Removes a named handler across all selectors.

---

## 💡 Use Case: Multiple Named Handlers per Hotkey

```ts
const loggerHandler = keyboard.addNamedHandler('Ctrl+C', 'logger', (e) => {
  console.log('Ctrl+C pressed')
})

const clipboardHandler = keyboard.addNamedHandler('Ctrl+C', 'clipboard', (e) => {
  console.log('Intercepted copy to clipboard')
})
```

Now bind it once:

```ts
window.addEventListener('keydown', loggerHandler)
window.addEventListener('keydown', clipboardHandler)
```

### Output when pressing `Ctrl+C`

```
Ctrl+C pressed
Intercepted copy to clipboard
```

Remove one handler by name:

```ts
keyboard.removeNamedHandler('Ctrl+C', 'logger')
```

### Output now:

```
Intercepted copy to clipboard
```

Remove all handlers:

```ts
keyboard.removeHandlers('Ctrl+C')
```

---

## 🧪 Advanced: Dynamic Registration

```ts
keyboard.addNamedHandler('Cmd+K', 'openSearch', () => {
  console.log('Open search')
})

keyboard.addNamedHandler('Cmd+K', 'logger', () => {
  console.log('Cmd+K triggered')
})

keyboard.addNamedHandler('Cmd+W', 'logger', () => {
  console.log('Cmd+W triggered')
})

// removes from both Cmd+K and Cmd+W
keyboard.removeNamedHandlersForAllSelectors('logger')
```

---

## 🔍 Exports

From the main entrypoint:

* `keyboard` — instance of `Keyboard`. Manages handlers creating and deleting

Also includes:

* `keyAliases`, `keyFilters` - mappers used to differentiate hotkeys
* Types: 
  - `Selector` = `string` - for hotkeys. Example: "Ctrl+K" 
  - `Key` = `string` - for single keys. Example: "K"
  - `Handler` = `[ Name, Callback ]` - entry for selector handlers
  - `Name` = `string | number | symbol` - represents the name of the handler
  - `Filter` = `(e: KeyboardEvent) => boolean` - checks that specific key is pressed
  - `Callback` = `(e: KeyboardEvent) => void` - generated callback to be applied by client code

---

## ✅ Compatible Environments

* Browser (DOM events)
* React / Vue / Svelte / SolidJS
* Vanilla JS or TS projects
* Electron / Tauri / Webview apps
* Node.js with simulated events (for testing)
---
