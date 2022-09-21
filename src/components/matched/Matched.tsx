import React, { useState, useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/matched/style.css'

//recoilの導入はまだ
// import { useRecoilState } from 'recoil'
// import { userInfoState } from '@/atoms/userInfoAtom'

// console.log(userInfoState)
// console.log(useRecoilState(userInfoState))

type MatchedUsersType = {
  [key in string]: UserInfo
}

type UserInfo = {
  name: string
  password: string
  nickname: string
  photo: string
  email: string
  favoriteTypes: string[]
  hobbies: string[]
  likedNum: number
  selfIntro: string
  isHidden: boolean
}

export const Matched = () => {
  const [matchedUsers, setMatchedUsers] = useState<MatchedUsersType>({})

  const fetchMatched = async (): Promise<void> => {
    //userIdは手打ち。最終的にはグローバル変数で受け取る？
    const myId = '3f328652-f4bb-4254-972a-d70489794a25' //Shohei Ohtani
    //const myId = 'e857624e-ace4-44a5-8c9f-b9203f10df1f' //Tomoharu Kobayashi
    //userIdをクエリパラメータに設定
    const response = await fetch(`${process.env.API_ENDPOINT}/matched?userId=${myId}`, {
      method: 'GET',
    })
    const resJson: MatchedUsersType = await response.json()
    setMatchedUsers(resJson)
    console.log(resJson)
  }

  useEffect(() => {
    const run = fetchMatched()
  }, [])

  return (
    <>
      <Header />
      <p>This is a Matched component.</p>
      {/* <button onClick={fetchMatched}>See matched members!</button> */}
      {/* 案① <MatchedUser user={matcheduser} /> を作る(根本解決ではないかも) */}
      <div>
        {Object.keys(matchedUsers).map((userId) => (
          <div key={userId} className={classes.container}>
            <img src={matchedUsers[userId].photo} className={classes.photo}></img>
            <h3 className={classes.name}>{matchedUsers[userId].name}</h3>
            <p className={classes.message}>{matchedUsers[userId].selfIntro}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}
// base64エンコードは下記を使用
// https://web-toolbox.dev/tools/base64-encode-image
