// filters are used to call handlers ONLY for specified "hot keys"
export type Filter = (event: KeyboardEvent) => boolean
