import React, { useCallback, useEffect, useState } from 'react'
import styles from './App.module.css'
import cn from 'classnames'
import { ResultList } from './components/ResultList/ResultList'
import { IDiff, IJsonDiff } from './models/models'

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
        if (Array.isArray(result)) {
          return [...prevState, ...result]
        } else {
          return [...prevState, result]
        }
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
        const Changed: IDiff = {}
        const Added: IDiff = {}
        const Removed: IDiff = {}

        if (index) {
          Object.keys({ ...jsonObject, ...jsonObjects[index - 1] }).forEach(
            (jsonKey) => {
              const prevValue = jsonObjects[index - 1][jsonKey]
              const currentValue = jsonObject[jsonKey]

              if (prevValue === undefined) {
                Added[jsonKey] = { prevValue, currentValue }
              } else if (currentValue === undefined) {
                Removed[jsonKey] = { prevValue, currentValue }
              } else if (prevValue !== currentValue) {
                Changed[jsonKey] = { prevValue, currentValue }
              }
            }
          )
        }

        return {
          Changed,
          Added,
          Removed,
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
          <button onClick={add}>Add</button>{' '}
          <button onClick={clearInput}>Clear input</button>{' '}
          <button onClick={clearList}>Clear list</button>
        </div>
      </div>

      {Boolean(jsonObjects.length) && (
        <ResultList
          jsonObjects={jsonObjects}
          jsonDiffs={jsonDiffs}
          remove={remove}
        />
      )}
    </div>
  )
}

export default App
