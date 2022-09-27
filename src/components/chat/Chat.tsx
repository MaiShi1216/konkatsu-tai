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
  nickname1: string
  nickname2: string
  photo1: string
  photo2: string
}

export const Chat = () => {
  const [sendMessage, setSendMessage] = useState<string>(undefined)

  const sendPersonId1 = '3f328652-f4bb-4254-972a-d70489794a25'
  const sendPersonId2 = 'b830fcc6-b691-462a-beb0-20a73eeed2d9'

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
        window.location.href = '/chat'
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
  }

  return (
    <div className={classes.container}>
      <Header />
      <h2>Chat</h2>
      <p>This is a chat component.</p>
      <button onClick={fetchChat}>Execute fetch!</button>
      <div>
        {Object.keys(chatHis).map((chatId) => (
          <div key={chatId} className={classes.container}>
            <img src={chatHis[chatId].photo1} className={classes.photo}></img>
            <h3 className={classes.message}>{chatHis[chatId].nickname1}</h3>
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
