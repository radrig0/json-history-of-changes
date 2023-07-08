import styles from './Diff.module.css'
import { IDiff, TValue } from '../../App'
import { useCallback } from 'react'
import { valueRender } from '../../utils/valueRender'

type TDiffType = 'Changed' | 'Added' | 'Removed'

interface IProps {
  type: TDiffType
  record: IDiff
}

interface IChanges {
  prevValue: TValue
  currentValue: TValue
}

export const Diff = ({ type, record }: IProps) => {
  const changedRender = useCallback(({ prevValue, currentValue }: IChanges) => {
    return `${valueRender(prevValue)} -> ${valueRender(currentValue)}`
  }, [])

  const addedRender = useCallback(({ currentValue }: IChanges) => {
    return valueRender(currentValue)
  }, [])

  const removedRender = useCallback(({ prevValue }: IChanges) => {
    return valueRender(prevValue)
  }, [])

  const diffRender = useCallback(
    (diffType: TDiffType, changes: IChanges) => {
      switch (diffType) {
        case 'Changed':
          return changedRender(changes)

        case 'Added':
          return addedRender(changes)

        case 'Removed':
          return removedRender(changes)
      }
    },
    [addedRender, changedRender, removedRender]
  )

  return (
    <div className={styles.diffItem}>
      <div className={styles.diffType}>{type}:</div>
      {Object.keys(record).map((recordKey) => {
        const value = record[recordKey]
        return (
          <div className={styles[type]} key={recordKey}>
            <span className={styles.key}>{recordKey}</span>:{' '}
            <span className={styles.value}>{diffRender(type, value)}</span>
          </div>
        )
      })}
    </div>
  )
}
