/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, useEffect } from 'react'
import classes from '@/components/chat/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { UserInfoContentType } from '@/utils/types'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'
import TextField from '@mui/material/TextField'
import { send } from 'process'

type ResJson = {
  chatHistory: ChatHistoryType
  familiarity: number
}

type ChatHistoryType = ChatInfo[]

type ChatInfo = {
  personId1: string
  personId2: string
  content: string
  date: string
}

export const Chat = () => {
  const [sendMessage, setSendMessage] = useState<string>(undefined)
  const [chatHistory, setChatHistory] = useState<ChatHistoryType>([])
  const [partnerPhoto, setPartnerPhoto] = useState<string>(undefined)

  const userInfo = useRecoilValue(userInfoState)
  const loginUserId: string = Object.keys(userInfo)[0]
  const loginUserPhoto: string = userInfo[Object.keys(userInfo)[0]].photo
  const partnerId = 'b830fcc6-b691-462a-beb0-20a73eeed2d9'

  useEffect(() => {
    getPartnerInfo().catch(() => {
      // エラー処理
    })

    getChatHistory().catch(() => {
      // エラー処理
    })
    setInterval(getChatHistory, 1000)
  }, [])

  const getPartnerInfo = async () => {
    const response = await fetch(`${process.env.API_ENDPOINT}/user?userId=${partnerId}`, {
      method: 'GET',
    })
    const resJson: UserInfoContentType = await response.json()
    setPartnerPhoto(resJson.photo)
  }

  const getChatHistory = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/chat?userId1=${loginUserId}&userId2=${partnerId}`, {
      method: 'GET',
    })
    const resJson: ResJson = await response.json()
    if (resJson.chatHistory) {
      setChatHistory(resJson.chatHistory)
    } else {
      setChatHistory([])
    }
  }

  const postMessage = async () => {
    try {
      const response = await fetch(`${process.env.API_ENDPOINT}/chat?userId1=${loginUserId}&userId2=${partnerId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: sendMessage }),
      })
      if (response.status === 200) {
        setSendMessage('')
        const resJson: ResJson = await response.json()
        setChatHistory(resJson.chatHistory)
      } else {
        console.error('err')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={classes.container}>
      <Header />
      {Object.keys(chatHistory).map((i) => (
        <div key={i} className={chatHistory[i].personId1 === loginUserId ? classes.sendChatContainer : classes.receiveChatContainer}>
          <img src={chatHistory[i].personId1 === loginUserId ? loginUserPhoto : partnerPhoto} className={classes.photo}></img>
          <p className={classes.message}>{chatHistory[i].content}</p>
        </div>
      ))}
      <div className={classes.sendMessageContainer}>
        <TextField
          className={classes.message}
          id="filled-textarea"
          rows={1}
          label="New message"
          multiline
          onChange={(e) => setSendMessage(e.target.value)}
          value={sendMessage}
        />
        <button className={classes.submitButton} onClick={postMessage}>
          Send
        </button>
      </div>
      <div className={classes.footerContainer}>
        <Footer />
      </div>
    </div>
  )
}
