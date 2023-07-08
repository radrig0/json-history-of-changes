import { IJsonParseResult } from '../models/models'

export const jsonParse = (value: string): IJsonParseResult => {
  const result: IJsonParseResult = {
    status: 'success',
    parsedData: [],
    errorMessage: '',
  }

  try {
    const parsedData = JSON.parse(value)

    result.parsedData = Array.isArray(parsedData) ? parsedData : [parsedData]

    result.status = 'success'
  } catch (e) {
    result.status = 'failed'
    result.errorMessage = `Wrong value: ${e}`
  }

  return result
}
