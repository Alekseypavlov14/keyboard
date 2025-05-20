import { Filter } from './types/filter'
import { Key } from './types/key'

export const keyFilters: Record<Key, Filter> = {
  // windows
  ctrl: (e) => e.ctrlKey,
  shift: (e) => e.shiftKey,
  alt: (e) => e.altKey,
  meta: (e) => e.metaKey,
  
  // mac
  command: (e) => e.metaKey,
  option: (e) => e.altKey,
}

// for regular keys
export function getDefaultFilter(key: Key) {
  return (e: KeyboardEvent) => e.key.toLowerCase() === key
}
