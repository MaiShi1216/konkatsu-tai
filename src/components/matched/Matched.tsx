import React, { useState, useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/matched/style.css'

type ResJson = {
  name: string
  password: string
  nickname: string
  photo: string
  sex: string
  birthday: Date
  email: string
  favoriteTypes: string
  hobbies: string
  likedNum: number
  selfIntro: string
  isHidden: any
}

export const Matched = () => {
  //const [message, setMessage] = useState({})
  const [message, setMessage] = useState({})

  const fetchSample = async (): Promise<void> => {
    //userIdは手打ち。最終的にはグローバル変数で受け取る？
    const myId = 'a002'
    //userIdをクエリパラメータに設定
    const query_params = new URLSearchParams({
      userId: myId,
    })
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await fetch(`${process.env.API_ENDPOINT}/matched?${query_params}`, {
      method: 'GET',
    })
    const resJson: ResJson = await response.json()
    //setMessage(resJson.name)
    setMessage(resJson)
    console.log(resJson)
  }

  return (
    <>
      <Header />
      <p>This is a Matched component.</p>
      <button onClick={fetchSample}>See matched members!</button>
      <div>
        {Object.keys(message).map((i) => (
          <div key={i} className={classes.container}>
            <img src={message[i].photo} className={classes.photo}></img>
            <h3 className={classes.name}>{message[i].name}</h3>
            <p className={classes.message}>{message[i].selfIntro}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}
// base64エンコードは下記を使用
// https://web-toolbox.dev/tools/base64-encode-image
