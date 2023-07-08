import styles from './Diff.module.css'

interface IProps {
  type: 'Changed' | 'Added' | 'Removed'
  record: Record<string, string>
}

export const Diff = ({ type, record }: IProps) => {
  return (
    <div className={styles.diffItem}>
      <div className={styles.diffType}>{type}:</div>
      {Object.keys(record).map((recordKey) => {
        return (
          <div className={styles[type]} key={recordKey}>
            <span className={styles.key}>{recordKey}</span>:{' '}
            <span className={styles.value}>{record[recordKey]}</span>
          </div>
        )
      })}
    </div>
  )
}
