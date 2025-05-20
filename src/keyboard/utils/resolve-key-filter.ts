import { getDefaultFilter, keyFilters } from '../key.filters'
import { Filter } from '../types/filter'
import { Key } from '../types/key'

// maps the keyboard key to filter
// filters prevent calling handlers until correct "hot key" combination is pressed
export function resolveKeyFilter(key: Key): Filter {
  const specialFilter = keyFilters[key]
  if (!specialFilter) return getDefaultFilter(key)

  return specialFilter
}
