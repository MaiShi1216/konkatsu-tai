import React, { useState, useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/recommended/style.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { UserInfoType } from '@/utils/types'
import { useNavigate } from 'react-router-dom'
import { Main } from '@/components/recommended/Main'

//Recoil-on
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

type ReceivedDataType = {
  [key in string]: UserInfoType
}

export const Recommended = () => {
  const [recommendedUsersByHobbies, setRecommendedUsersByHobbies] = useState<UserInfoType>({})
  const [recommendedUsersByLikes, setRecommendedUsersByLikes] = useState<UserInfoType>({})
  const [commonPoints, setCommonPoints] = useState<UserInfoType>({})
  const navigate = useNavigate()

  //RecoilでユーザIDを取得
  const userInfo = useRecoilValue(userInfoState)
  const myId = Object.keys(userInfo)[0]

  const fetchRecommended = async (): Promise<void> => {
    //userIdをクエリパラメータに設定
    const response = await fetch(`${process.env.API_ENDPOINT}/recommended?loginId=${myId}`, {
      method: 'GET',
    })
    const resJson: ReceivedDataType = await response.json()
    setRecommendedUsersByHobbies(resJson.recommendedByBobbies)
    setRecommendedUsersByLikes(resJson.recommendedByLikes)
    setCommonPoints(resJson.commonPoints)
  }

  const transferToProfile = (userId) => {
    navigate('/profile', { state: { id: userId } })
  }

  //ページ読み込み時にレンダリング
  useEffect(() => {
    fetchRecommended().catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <div className={classes.main}>
      <Header />
      <h2 className={classes.mainTitle}>Recommendations</h2>
      <h3 className={classes.subTitle}>People with similar hobbies</h3>
      <Main users={recommendedUsersByHobbies} hobby={commonPoints} />
      <h3 className={classes.subTitle}>People who liked you</h3>
      <Main users={recommendedUsersByLikes} hobby={commonPoints} />
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  )
}
