import { isArray, isString, mapKeys } from 'lodash'
import classnames from 'classnames'

const prefix = (prefix, name) => `${prefix}-${name}`
export default function c (name, ...modifiers) {
  modifiers = processModifiers(name, modifiers)
  return classnames(name, ...modifiers)
}

function processModifiers (name, modifiers) {
  return modifiers.map(modifier => {
    if (isArray(modifier)) return processModifiers(name, modifier)
    if (isString(modifier)) return prefix(name, modifier)
    return mapKeys(modifier, (value, key) => prefix(name, key))
  })
}

export function cPrefix (modulePrefix) {
  return function (name, ...modifiers) {
    return c(prefix(modulePrefix, name), ...modifiers)
  }
}
