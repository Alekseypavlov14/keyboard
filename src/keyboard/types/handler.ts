import { Callback } from './callback'
import { Name } from './name'

// record that represents one of the handlers for specific "hot key" selector
export type Handler = [ Name, Callback<KeyboardEvent> ]
