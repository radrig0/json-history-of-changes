import './Diff.css'

interface IProps {
  type: 'Changed' | 'Added' | 'Removed'
  record: Record<string, string>
}

export const Diff = ({ type, record }: IProps) => {
  return (
    <div className="diffItem">
      <div className="diffType">{type}:</div>
      {Object.keys(record).map((recordKey) => {
        return (
          <div className={type} key={recordKey}>
            <span className="key">{recordKey}</span>:{' '}
            <span className="value">{record[recordKey]}</span>
          </div>
        )
      })}
    </div>
  )
}
