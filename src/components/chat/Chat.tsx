import React, { useState } from 'react'

type ResJson = {
  content: string
}

export const Chat = () => {
  const [message, setMessage] = useState(undefined)

  const fetchChat = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/chat`, {
      method: 'GET',
    })
    const resJson: ResJson = await response.json()
    setMessage(resJson.content)
  }

  return (
    <>
      <p>This is a chat component.</p>
      <button onClick={fetchChat}>Execute fetch!</button>
      <p>{message}</p>
    </>
  )
}
