import React, { useState } from 'react'

type ResJson = {
  name: string
}

export const Matched = () => {
  const [message, setMessage] = useState(undefined)

  const fetchSample = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/sample`, {
      method: 'GET',
    })
    const resJson: ResJson = await response.json()
    setMessage(resJson.name)
  }

  return (
    <>
      <p>This is a sample Matched component.</p>
      <button onClick={fetchSample}>Execute fetch!</button>
      <p>{message}</p>
    </>
  )
}
