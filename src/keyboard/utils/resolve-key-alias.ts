import { keyAliases } from '../key.aliases'
import { Key } from '../types/key'

// maps key name or alias to browser supported key
// returns browser supported key in lower case
export function resolveKeyAlias(key: string): Key {
  const lower = key.toLowerCase()
  return keyAliases[lower] || lower
}
