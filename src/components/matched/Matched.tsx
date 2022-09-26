import React, { useState, useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/matched/style.css'
import { UserInfoType } from '@/utils/types'

//Recoil-on
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

export const Matched = () => {
  const [matchedUsers, setMatchedUsers] = useState<UserInfoType>({})

  //RecoilでユーザIDを取得
  const userInfo = useRecoilValue(userInfoState)
  const myId = Object.keys(userInfo)[0]
  //console.log(myId)

  const fetchMatched = async (): Promise<void> => {
    //userIdをクエリパラメータに設定
    const response = await fetch(`${process.env.API_ENDPOINT}/matched?userId=${myId}`, {
      method: 'GET',
    })
    const resJson: UserInfoType = await response.json()
    setMatchedUsers(resJson)
    console.log(resJson)
  }

  //ページ読み込み時にレンダリング
  useEffect(() => {
    fetchMatched().catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <>
      <Header />
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
