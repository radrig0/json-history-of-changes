import { IJsonParseResult } from '../models/models'

export const jsonParse = (value: string): IJsonParseResult => {
  const result: IJsonParseResult = {
    status: 'success',
    parsedData: [],
    errorMessage: '',
  }

  try {
    const preparedValue = prepareString(value)
    const parsedData = JSON.parse(preparedValue)

    result.parsedData = Array.isArray(parsedData) ? parsedData : [parsedData]

    result.status = 'success'
  } catch (e) {
    result.status = 'failed'
    result.errorMessage = `Wrong value: ${e}`
  }

  return result
}

const prepareString = (value: string) => {
  let newValue = value
  newValue = newValue.replaceAll('“', '"')
  newValue = newValue.replaceAll('”', '"')

  const trimmedSymbols = ['"', "'", ',']

  if (trimmedSymbols.includes(newValue[0])) {
    newValue = newValue.substring(1)
  }

  if (trimmedSymbols.includes(newValue[newValue.length - 1])) {
    newValue = newValue.substring(0, newValue.length - 1)
  }

  console.log(newValue)
  return newValue
}
