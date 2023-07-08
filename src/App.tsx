import React, { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Diff } from './components/Diff'

interface IJsonDiff {
  changed: Record<string, string>
  added: Record<string, string>
  removed: Record<string, string>
}

function App() {
  const [textValue, setTextValue] = useState('')
  const [jsonObjects, setJsonObjects] = useState<string[]>([])
  const [jsonDiffs, setJsonDiffs] = useState<IJsonDiff[]>([])

  const onChangeTextValue: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((event) => {
      setTextValue(event.target.value)
    }, [])

  const add = useCallback(() => {
    setJsonObjects((prevState) => {
      return [textValue, ...prevState]
    })
    setTextValue('')
  }, [textValue])

  const remove = useCallback(
    (index: number) => {
      const newState = [...jsonObjects]
      newState.splice(index, 1)
      setJsonObjects(newState)
    },
    [jsonObjects]
  )

  useEffect(() => {
    setJsonDiffs(() => {
      return jsonObjects.map((jsonObject, index) => {
        return {
          changed: { field: jsonObject[index] },
          added: { field: jsonObject[index] },
          removed: { field: jsonObject[index] },
        }
      })
    })
  }, [jsonObjects])

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
        <div className="jsonItem">
          <div className="column title">Your jsons:</div>
          <div className="column title">Diffs:</div>
        </div>

        {jsonObjects.map((jsonObject, index) => {
          return (
            <div key={jsonObject} className="jsonItem">
              <div className="column">
                <div className="jsonObject">{jsonObject}</div>
                <button
                  onClick={() => {
                    remove(index)
                  }}
                >
                  remove
                </button>
              </div>

              <div className="column">
                <div key={`jsonDiffs_${index}`} className="diffItem">
                  <div>Changed:</div>
                  <Diff record={jsonDiffs[index].changed} />

                  <div>Added:</div>
                  <Diff record={jsonDiffs[index].added} />

                  <div>Removed:</div>
                  <Diff record={jsonDiffs[index].removed} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
