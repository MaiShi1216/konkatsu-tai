import React, { useState, useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/recommended/style.css'
import { UserInfoContentType, UserInfoType } from '@/utils/types'
import { Main } from '@/components/recommended/Main'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

type Familiarity = {
  familiarity?: number
}

type UserInfoTypeWithFamiliarity = {
  [key in string]: UserInfoContentType & Familiarity
}

type ReceivedDataType = {
  recommendedByHobbies: UserInfoTypeWithFamiliarity
  recommendedByLikes: UserInfoTypeWithFamiliarity
  commonPoints: UserInfoType
}

export const Recommended = () => {
  const [recommendedUsersByHobbies, setRecommendedUsersByHobbies] = useState<UserInfoType>({})
  const [recommendedUsersByLikes, setRecommendedUsersByLikes] = useState<UserInfoType>({})
  const [commonPoints, setCommonPoints] = useState<UserInfoType>({})
  const userInfo = useRecoilValue(userInfoState)
  const myId = Object.keys(userInfo)[0]

  const fetchRecommended = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/recommended?loginId=${myId}`, {
      method: 'GET',
    })
    const resJson: ReceivedDataType = await response.json()
    setRecommendedUsersByHobbies(resJson.recommendedByHobbies)
    setRecommendedUsersByLikes(resJson.recommendedByLikes)
    setCommonPoints(resJson.commonPoints)
  }

  useEffect(() => {
    fetchRecommended().catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <div className={classes.main}>
      <Header menuExist={true} />
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
