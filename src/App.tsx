import React, { useCallback, useEffect, useState } from 'react'
import styles from './App.module.css'
import cn from 'classnames'
import { ResultList } from './components/ResultList/ResultList'
import { IDiff, IJsonDiff, TValue } from './models/models'
import { jsonParse } from './utils/jsonParse'
import { Button } from './components/button/Button.tsx'

function App() {
  const [textValue, setTextValue] = useState('')
  const [textError, setTextError] = useState('')
  const [jsonObjects, setJsonObjects] = useState<Record<string, TValue>[]>([])
  const [jsonDiffs, setJsonDiffs] = useState<IJsonDiff[]>([])

  const onChangeTextValue: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((event) => {
      setTextValue(event.target.value)
      setTextError('')
    }, [])

  const add = useCallback(() => {
    if (!textValue) {
      return
    }

    const result = jsonParse(textValue)

    if (result.status === 'success') {
      setJsonObjects((prevState) => {
        return [...prevState, ...result.parsedData]
      })

      setTextValue('')
      setTextError('')
    } else {
      setTextError(result.errorMessage)
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
    [jsonObjects],
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
            },
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
        <h1>
          Put your object or array of object here
        </h1>
        {textError && <div className="text-red-600">{textError}</div>}
        <textarea
          className={cn({
            [styles.textInput]: true,
            "text-red-600": textError,
          })}
          name="jsonInput"
          id="jsonInput"
          value={textValue}
          onChange={onChangeTextValue}
        />
        <div className="flex gap-2">
          <Button onClick={add}>Add</Button>
          <Button type={'secondary'} onClick={clearInput}>Clear input</Button>
          <Button type={'secondary'} onClick={clearList}>Clear list</Button>
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