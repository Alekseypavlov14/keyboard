import { Key } from './types/key'

export const keyAliases: Record<string, Key> = {
  ctrl: "ctrl",
  control: "ctrl",
  shift: "shift",
  alt: "alt",
  option: "alt",
  meta: "meta",
  cmd: "meta",
  command: "meta",

  plus: "+",
  minus: "-",

  esc: "escape",
  escape: "escape",
  enter: "enter",
  return: "enter",
  space: " ",

  up: "arrowup",
  down: "arrowdown",
  left: "arrowleft",
  right: "arrowright",
}
