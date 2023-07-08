interface IProps {
  record: Record<string, string>
}

export const Diff = ({ record }: IProps) => {
  return (
    <div>
      {Object.keys(record).map((recordKey) => {
        return (
          <div key={recordKey}>
            <span className="key">{recordKey}</span>:{' '}
            <span className="value">{record[recordKey]}</span>
          </div>
        )
      })}
    </div>
  )
}
