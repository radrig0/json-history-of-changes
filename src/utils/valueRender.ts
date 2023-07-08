import { TValue } from '../models/models'

export const valueRender = (value: TValue) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`

    case 'boolean':
      return value.toString()

    case 'number':
    default:
      return value
  }
}
