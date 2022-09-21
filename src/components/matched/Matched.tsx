import React, { useState, useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/matched/style.css'

//recoilの導入はまだ
// import { useRecoilState } from 'recoil'
// import { userInfoState } from '@/atoms/userInfoAtom'

// console.log(userInfoState)
// console.log(useRecoilState(userInfoState))

type ResJson = {
  name: string
  password: string
  nickname: string
  photo: string
  sex: string
  birthday: string
  email: string
  favoriteTypes: string
  hobbies: string
  likedNum: number
  selfIntro: string
  isHidden: any
}

export const Matched = () => {
  const [matchedUsers, setMatchedUsers] = useState<object>([])

  const fetchMatched = async (): Promise<void> => {
    //userIdは手打ち。最終的にはグローバル変数で受け取る？
    const myId = 'a001'
    //userIdをクエリパラメータに設定
    const query_params = new URLSearchParams({
      userId: myId,
    })
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const response = await fetch(`${process.env.API_ENDPOINT}/matched?${query_params}`, {
      method: 'GET',
    })
    const resJson: object = await response.json()
    setMatchedUsers(resJson)
    console.log(resJson)
  }

  useEffect(() => {
    const run = fetchMatched()
  }, [])

  //オブジェクト表示用の関数
  const result = mapObj()=> {
    Object.keys(matchedUsers).map((i) => (
    const matchedUser: ResJson = matchedUsers[i]
        return(
        < div key = { i } className = { classes.container } >
      <img src={matchedUser.photo} className={classes.photo}></img>
      <h3 className={classes.name}>{mmatchedUser.name}</h3>
      <p className={classes.message}>{matchedUser.selfIntro}</p>
          </div>
        )
  ))
}

  return (
    <>
      <Header />
      <p>This is a Matched component.</p>
      <div>
        {result}
        {/* {Object.keys(matchedUsers).map((i) => (
          //const matchedUser:ResJson=matchedUsers[i]
          <div key={i} className={classes.container}>
            <img src={matchedUsers[i].photo} className={classes.photo}></img>
            <h3 className={classes.name}>{matchedUsers[i].name}</h3>
            <p className={classes.message}>{matchedUsers[i].selfIntro}</p>
          </div>
        ))} */}
      </div>
      <Footer />
    </>
  )
}
// base64エンコードは下記を使用
// https://web-toolbox.dev/tools/base64-encode-image
