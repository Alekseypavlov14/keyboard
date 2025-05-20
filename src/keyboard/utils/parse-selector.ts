import { selectorSeparator } from '../constants'
import { resolveKeyAlias } from './resolve-key-alias'
import { Selector } from '../types/selector'
import { Key } from '../types/key'

// parses selector to array of required keys for "hot key"
// returns keys array in lowercase
export function parseSelector(selector: Selector): Key[] {
  const tokens = selector.split(selectorSeparator).map(key => key.trim())
  const keys = tokens.map(resolveKeyAlias)
  return keys  
}
