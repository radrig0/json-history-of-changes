import styles from './ResultList.module.css'
import cn from 'classnames'
import { useCallback } from 'react'
import { ObjectRender } from '../ObjectRender/ObjectRender'
import { Diff } from '../Diff/Diff'
import { IJsonDiff, TValue } from '../../models/models'

interface IProps {
  jsonObjects: Record<string, TValue>[]
  jsonDiffs: IJsonDiff[]
  remove: (index: number) => void
}

export const ResultList = ({ jsonObjects, jsonDiffs, remove }: IProps) => {
  const diffRender = useCallback(
    (index: number) => {
      const diff = jsonDiffs[index]
      if (!diff) {
        return
      }

      const changedLength = Object.keys(diff.Changed).length
      const addedLength = Object.keys(diff.Added).length
      const removedLength = Object.keys(diff.Removed).length

      const isEmptyDiff = !(changedLength + addedLength + removedLength)

      if (isEmptyDiff) {
        return 'Object is not changed'
      }

      return (
        <div key={`jsonDiffs_${index}`} className={styles.diffItem}>
          {Boolean(changedLength) && (
            <Diff type={'Changed'} record={diff.Changed} />
          )}
          {Boolean(addedLength) && <Diff type={'Added'} record={diff.Added} />}
          {Boolean(removedLength) && (
            <Diff type={'Removed'} record={diff.Removed} />
          )}
        </div>
      )
    },
    [jsonDiffs]
  )

  const listItemRender = useCallback(
    (jsonObject: Record<string, TValue>, index: number) => {
      return (
        <div key={`jsonObject_${index}`} className={styles.jsonItem}>
          <div className={styles.column}>
            <div className={styles.order}>{index}.</div>
            <div className={styles.jsonObject}>
              <ObjectRender object={jsonObject} />
            </div>
            <button
              onClick={() => {
                remove(index)
              }}
            >
              remove
            </button>
          </div>
          <div className={styles.column}>{diffRender(index)}</div>
        </div>
      )
    },
    [diffRender, remove]
  )

  const listRender = useCallback(
    (jsonObjects: Record<string, TValue>[]) => {
      const result = []
      for (let i = jsonObjects.length - 1; i > -1; i--) {
        result.push(listItemRender(jsonObjects[i], i))
      }
      return result
    },
    [listItemRender]
  )

  return (
    <div className={styles.resultWrapper}>
      <div className={styles.jsonItem}>
        <div className={cn(styles.column, styles.title)}>Objects:</div>
        <div className={cn(styles.column, styles.title)}>Diffs:</div>
      </div>

      {listRender(jsonObjects)}
    </div>
  )
}
