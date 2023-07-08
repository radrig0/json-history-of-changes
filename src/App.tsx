import React, { useCallback, useState } from 'react'
import './App.css'

interface IJsonDiff {
  changed: Record<string, string>
  added: Record<string, string>
  removed: Record<string, string>
}

function App() {
  const [textValue, setTextValue] = useState('')
  const [jsonObjects, setJsonObjects] = useState<object[]>([])
  const [jsonDiffs, setJsonDiffs] = useState<IJsonDiff[]>([])

  const onChangeTextValue: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((event) => {
      setTextValue(event.target.value)
    }, [])

  const add = useCallback(() => {}, [])

  return (
    <div className="App">
      <div className="inputWrapper">
        <div className="title">Put your object or array of object here</div>
        <textarea
          name="jsonInput"
          id="jsonInput"
          cols={30}
          rows={10}
          value={textValue}
          onChange={onChangeTextValue}
        />
        <button onClick={add}>Add</button>
      </div>
      <div className="resultWrapper">
        <div className="objectColumn">Your jsons:</div>

        <div className="diffColumn">Diffs</div>
      </div>
    </div>
  )
}

export default App
