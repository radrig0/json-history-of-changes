import styles from './ResultList.module.css'
import cn from 'classnames'
import React, { useCallback } from 'react'
import { ObjectRender } from '../ObjectRender/ObjectRender'
import { Diff } from '../Diff/Diff'
import { IJsonDiff, TValue } from '../../models/models'

interface IProps {
  jsonObjects: Record<string, TValue>[]
  jsonDiffs: IJsonDiff[]
  remove: (index: number) => void
}

export const ResultList = ({ jsonObjects, jsonDiffs, remove }: IProps) => {
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

          {jsonDiffs[index] && (
            <div className={styles.column}>
              <div key={`jsonDiffs_${index}`} className={styles.diffItem}>
                <Diff type={'Changed'} record={jsonDiffs[index].Changed} />
                <Diff type={'Added'} record={jsonDiffs[index].Added} />
                <Diff type={'Removed'} record={jsonDiffs[index].Removed} />
              </div>
            </div>
          )}
        </div>
      )
    },
    [jsonDiffs, remove]
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
