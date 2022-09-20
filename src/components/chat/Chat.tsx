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
    console.log(resJson)
    console.log(`aaa${resJson}`)
    console.log(`bbb${resJson[0]}`)
    console.log(`ccc${resJson[0].content}`)

    //setMessage(resJson.content)
    setMessage(resJson[0].content + resJson[1].content)
  }

  return (
    <>
      <p>This is a chat component.</p>
      <button onClick={fetchChat}>Execute fetch!</button>
      <p>{message}</p>
    </>
  )
}
