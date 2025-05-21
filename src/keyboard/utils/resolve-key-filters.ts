import { getRegularKeyFilter, modifierKeysConfigs, modifierKeys } from '../key.filters'
import { Filter } from '../types/filter'
import { Key } from '../types/key'

export function resolveKeyFilters(keys: Key[]): Filter[] {
  const selectorModifierKeys = keys.filter(key => modifierKeys.includes(key))

  const modifierFilters = modifierKeysConfigs.map<Filter>(config => {
    return config.generate(selectorModifierKeys.some(key => config.keys.includes(key)))
  })

  const regularKeys = keys.filter(key => !modifierKeys.includes(key))
  const regularFilters = regularKeys.map<Filter>(getRegularKeyFilter)

  const allFilters = modifierFilters.concat(regularFilters)
  return allFilters
}