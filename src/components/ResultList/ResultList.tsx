import styles from './ResultList.module.css'
import cn from 'classnames'
import React from 'react'
import { ObjectRender } from '../ObjectRender/ObjectRender'
import { Diff } from '../Diff/Diff'
import { IJsonDiff } from '../../App'

interface IProps {
  jsonObjects: Record<string, string>[]
  jsonDiffs: IJsonDiff[]
  remove: (index: number) => void
}

export const ResultList = ({ jsonObjects, jsonDiffs, remove }: IProps) => {
  return (
    <div className={styles.resultWrapper}>
      <div className={styles.jsonItem}>
        <div className={cn(styles.column, styles.title)}>Objects:</div>
        <div className={cn(styles.column, styles.title)}>Diffs:</div>
      </div>

      {jsonObjects.map((jsonObject, index) => {
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
                  <Diff type={'Changed'} record={jsonDiffs[index].changed} />
                  <Diff type={'Added'} record={jsonDiffs[index].added} />
                  <Diff type={'Removed'} record={jsonDiffs[index].removed} />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
