import React, { useCallback, useEffect, useState } from 'react'
import styles from './App.module.css'
import { Diff } from './components/Diff/Diff'
import { ObjectRender } from './components/ObjectRender/ObjectRender'
import cn from 'classnames'

interface IJsonDiff {
  changed: Record<string, string>
  added: Record<string, string>
  removed: Record<string, string>
}

function App() {
  const [textValue, setTextValue] = useState('')
  const [textError, setTextError] = useState('')
  const [jsonObjects, setJsonObjects] = useState<Record<string, string>[]>([])
  const [jsonDiffs, setJsonDiffs] = useState<IJsonDiff[]>([])

  const onChangeTextValue: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((event) => {
      setTextValue(event.target.value)
    }, [])

  const add = useCallback(() => {
    try {
      const result = JSON.parse(textValue)
      setJsonObjects((prevState) => {
        return [...prevState, result]
      })
      setTextValue('')
      setTextError('')
    } catch (e) {
      setTextError(`Wrong value: ${e}`)
    }
  }, [textValue])

  const clearInput = useCallback(() => {
    setTextValue('')
    setTextError('')
  }, [])

  const clearList = useCallback(() => {
    setJsonObjects([])
  }, [])

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
        const changed: Record<string, string> = {}
        const added: Record<string, string> = {}
        const removed: Record<string, string> = {}

        if (index) {
          Object.keys({ ...jsonObject, ...jsonObjects[index - 1] }).forEach(
            (jsonKey) => {
              const prevValue = jsonObjects[index - 1][jsonKey]
              const currentValue = jsonObject[jsonKey]

              if (!currentValue) {
                removed[jsonKey] = prevValue
              } else if (!prevValue) {
                added[jsonKey] = currentValue
              } else if (prevValue !== currentValue) {
                changed[jsonKey] = `${prevValue} -> ${currentValue}`
              }
            }
          )
        }

        return {
          changed,
          added,
          removed,
        }
      })
    })
  }, [jsonObjects])

  return (
    <div className={styles.App}>
      <div className={styles.inputWrapper}>
        <div className={styles.title}>
          Put your object or array of object here
        </div>
        {textError && <div className={styles.errorMessage}>{textError}</div>}
        <textarea
          className={cn({
            [styles.textInput]: true,
            [styles.error]: textError,
          })}
          name="jsonInput"
          id="jsonInput"
          value={textValue}
          onChange={onChangeTextValue}
        />
        <div>
          <button onClick={add}>Add</button>
          <button onClick={clearInput}>Clear input</button>
          <button onClick={clearList}>Clear list</button>
        </div>
      </div>

      {Boolean(jsonObjects.length) && (
        <div className={styles.resultWrapper}>
          <div className={styles.jsonItem}>
            <div className={cn(styles.column, styles.title)}>Your jsons:</div>
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
                  <div className="column">
                    <div key={`jsonDiffs_${index}`} className="diffItem">
                      <Diff
                        type={'Changed'}
                        record={jsonDiffs[index].changed}
                      />
                      <Diff type={'Added'} record={jsonDiffs[index].added} />
                      <Diff
                        type={'Removed'}
                        record={jsonDiffs[index].removed}
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default App
