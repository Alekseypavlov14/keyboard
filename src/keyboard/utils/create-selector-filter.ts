import { resolveKeyFilters } from './resolve-key-filters'
import { parseSelector } from './parse-selector'
import { Selector } from '../types/selector'
import { Filter } from '../types/filter'

// creates a global filter for the "hot key" combination
// based on filters for each key in combination
export function createSelectorFilter(selector: Selector): Filter {
  const keys = parseSelector(selector)
  const filters = resolveKeyFilters(keys)

  return (e: KeyboardEvent) => filters.every(filter => filter(e))
}