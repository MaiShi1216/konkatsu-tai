import React, { useState } from 'react'

type ResJson = {
  name: string
}

export const Signin = () => {
  const [message, setMessage] = useState(undefined)

  const fetchSample = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/signin`, {
      method: 'GET',
    })
    const resJson: ResJson = await response.json()
    setMessage(resJson.name)
  }

  return (
    <>
      <p>This is a signin component.</p>
      <button onClick={fetchSample}>Execute fetch!</button>
      <p>{message}</p>
    </>
  )
}
