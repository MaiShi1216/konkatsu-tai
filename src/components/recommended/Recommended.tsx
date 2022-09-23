import React, { useState, useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/matched/style.css'

//Recoil-on
// import { useRecoilState } from 'recoil'
// import { userInfoState } from '@/atoms/userInfoAtom'

//Recoil-off for test
const myId = '3f328652-f4bb-4254-972a-d70489794a25' //Shohei Ohtani
//const myId = 'e857624e-ace4-44a5-8c9f-b9203f10df1f' //Tomoharu Kobayashi

type ReceivedDataType = {
  [key in string]: RecommendedUsersType
}

type RecommendedUsersType = {
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

export const Recommended = () => {
  const [recommendedUsersByHobbies, setRecommendedUsersByHobbies] = useState<RecommendedUsersType>({})
  const [recommendedUsersByLikes, setRecommendedUsersByLikes] = useState<RecommendedUsersType>({})

  const fetchRecommended = async (): Promise<void> => {
    //userIdをクエリパラメータに設定
    const response = await fetch(`${process.env.API_ENDPOINT}/recommended?userId=${myId}`, {
      method: 'GET',
    })
    const resJson: ReceivedDataType = await response.json()
    setRecommendedUsersByHobbies(resJson.rebommendedByBobbies)
    setRecommendedUsersByLikes(resJson.rebommendedByLikes)
    console.log(resJson)
  }

  //ページ読み込み時にレンダリング
  useEffect(() => {
    fetchRecommended().catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <>
      <Header />
      <h1>They are recommended for you!</h1>
      <h2>They have similar hobbies to yours</h2>
      <div>
        {Object.keys(recommendedUsersByHobbies).map((userId) => (
          <div key={userId} className={classes.container}>
            <img src={recommendedUsersByHobbies[userId].photo} className={classes.photo}></img>
            <h3 className={classes.name}>{recommendedUsersByHobbies[userId].name}</h3>
            <p className={classes.message}>{recommendedUsersByHobbies[userId].selfIntro}</p>
          </div>
        ))}
      </div>
      <h2>They gave you a like</h2>
      <div>
        {Object.keys(recommendedUsersByLikes).map((userId) => (
          <div key={userId} className={classes.container}>
            <img src={recommendedUsersByLikes[userId].photo} className={classes.photo}></img>
            <h3 className={classes.name}>{recommendedUsersByLikes[userId].name}</h3>
            <p className={classes.message}>{recommendedUsersByLikes[userId].selfIntro}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}
