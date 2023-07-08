import './ObjectRender.css'

interface IProps {
  object: Record<string, string>
}

export const ObjectRender = ({ object }: IProps) => {
  return (
    <div className="record">
      <div className="recordLine">{'{'}</div>
      {Object.keys(object).map((key) => {
        return (
          <div key={key} className="recordLine recordLineMargin">
            {key}: {object[key]}
          </div>
        )
      })}
      <div className="recordLine">{'}'}</div>
    </div>
  )
}
