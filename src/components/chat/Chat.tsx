import React, { useState } from 'react'
import classes from '@/components/chat/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

type ResJson = {
  content: string
}
export const Chat = () => {
  const [message, setMessage] = useState(undefined)
  const [sendMessage, setSendMessage] = useState<string>(undefined)

  const handleSend = async () => {
    const newSendInfo = {
      sendMessage,
    }

    try {
      const response = await fetch(`${process.env.API_ENDPOINT}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSendInfo),
      })
      if (response.status === 200) {
        window.location.href = '/'
      } else {
        console.error('err')
      }
    } catch (err) {
      console.error(err)
    }
  }

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
    <div className={classes.container}>
      <Header />
      <h2>Chat</h2>
      <p>This is a chat component.</p>
      <button onClick={fetchChat}>Execute fetch!</button>
      <p>{message}</p>

      <h3>Input your message</h3>
      <textarea cols={40} rows={3} onChange={(e) => setSendMessage(e.target.value)}></textarea>
      <div>
        <button className={classes.submitButton} onClick={handleSend}>
          Send
        </button>
      </div>
      <Footer />
    </div>
  )
}
