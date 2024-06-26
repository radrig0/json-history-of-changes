export type TValue = string | number | boolean

export interface IDiff {
  [key: string]: {
    prevValue: TValue
    currentValue: TValue
  }
}

export type IJsonDiff = {
  [key in TDiffType]: IDiff
}

export interface IChanges {
  prevValue: TValue
  currentValue: TValue
}

export type TDiffType = 'Changed' | 'Added' | 'Removed'

export type TStatus = 'success' | 'failed'

export interface IJsonParseResult {
  parsedData: Record<string, TValue>[]
  status: TStatus
  errorMessage: string
}
