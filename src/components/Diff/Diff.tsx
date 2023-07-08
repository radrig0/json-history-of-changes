import styles from './Diff.module.css'
import { useCallback } from 'react'
import { valueRender } from '../../utils/valueRender'
import { IChanges, IDiff, TDiffType } from '../../models/models'

interface IProps {
  type: TDiffType
  record: IDiff
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
      <div className={styles.diffType}>
        {type} [{Object.keys(record).length}]:
      </div>
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
