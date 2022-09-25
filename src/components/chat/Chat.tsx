import React, { useState } from 'react'
import classes from '@/components/chat/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { iteratorSymbol } from 'immer/dist/internal'

type ChatInfoType = {
  [key in string]: ChatInfo
}

type ChatInfo = {
  personId1: string
  personId2: string
  content: string
  date: string
  familiarity: string
}

export const Chat = () => {
  const [message, setMessage] = useState(undefined)
  const [sendMessage, setSendMessage] = useState<string>(undefined)

  const sendPersonId1 = 'a001'
  const sendPersonId2 = 'a002'

  const handleSend = async () => {
    const newSendInfo = {
      personId1: sendPersonId1,
      personId2: sendPersonId2,
      content: sendMessage,
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

  const [chatHis, setChatHis] = useState<ChatInfoType>({})

  const fetchChat = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/chat`, {
      method: 'GET',
    })
    const resJson: ChatInfoType = await response.json()
    setChatHis(resJson)
    setMessage(resJson)
    const chatLen = Object.keys(resJson).length
    console.log(resJson)
    console.log(`aaa${resJson}`)
    console.log(`bbb${resJson[0]}`)
    console.log(`ccc${resJson[0].content}`)
    console.log(`length${chatLen}`)

    //setMessage(resJson.content)
    let chatMessage
    for (let i = 0; i < chatLen; i++) {
      chatMessage = chatMessage + resJson[i].content
    }
    //setMessage(resJson[0].content + resJson[1].content)
    setMessage(chatMessage)
  }

  return (
    <div className={classes.container}>
      <Header />
      <h2>Chat</h2>
      <p>This is a chat component.</p>
      <button onClick={fetchChat}>Execute fetch!</button>
      <p>{message}</p>
      <div>
        {Object.keys(chatHis).map((chatId) => (
          <div key={chatId} className={classes.container}>
            <p className={classes.message}>{chatHis[chatId].content}</p>
          </div>
        ))}
      </div>
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
