import styles from './ObjectRender.module.css'
import cn from 'classnames'
import { valueRender } from '../../utils/valueRender'

import { TValue } from '../../models/models'

interface IProps {
  object: Record<string, TValue>
}

export const ObjectRender = ({ object }: IProps) => {
  return (
    <div className={styles.record}>
      <div className={styles.recordLine}>{'{'}</div>
      {Object.keys(object).map((key) => {
        return (
          <div
            key={key}
            className={cn(styles.recordLine, styles.recordLineMargin)}
          >
            {key}: {valueRender(object[key])}
          </div>
        )
      })}
      <div className={styles.recordLine}>{'}'}</div>
    </div>
  )
}
