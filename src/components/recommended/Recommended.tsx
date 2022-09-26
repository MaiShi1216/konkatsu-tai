import React, { useState, useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/recommended/style.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { UserInfoType } from '@/utils/types'

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

  //RecoilでユーザIDを取得
  const userInfo = useRecoilValue(userInfoState)
  const myId = Object.keys(userInfo)[0]

  const fetchRecommended = async (): Promise<void> => {
    //userIdをクエリパラメータに設定
    const response = await fetch(`${process.env.API_ENDPOINT}/recommended?userId=${myId}`, {
      method: 'GET',
    })
    const resJson: ReceivedDataType = await response.json()
    setRecommendedUsersByHobbies(resJson.rebommendedByBobbies)
    setRecommendedUsersByLikes(resJson.rebommendedByLikes)
    setCommonPoints(resJson.commonPoints)
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
      <h2 className={classes.mainTitle}>Recommendations</h2>
      <h3 className={classes.subTitle}>People with similar interests</h3>
      <div>
        {Object.keys(recommendedUsersByHobbies).map((userId) => (
          <div key={userId} className={classes.container}>
            <img src={recommendedUsersByHobbies[userId].photo} className={classes.photo}></img>
            <div className={classes.likes}>
              <div>
                <ThumbUpAltIcon style={{ fontSize: '1rem' }} className={classes.ThumbUp} />
              </div>
              <div className={classes.liked_num}>
                {recommendedUsersByHobbies[userId].likedNum > 99 ? '99+' : recommendedUsersByHobbies[userId].likedNum}
              </div>
            </div>
            <h3 className={classes.name}>{recommendedUsersByHobbies[userId].name}</h3>
            <div className={classes.hobbies}>
              <p>Common interests:</p>
              {Object.keys(commonPoints[userId]).map((index) => (
                <ul key={index} style={{ listStyleType: 'none' }}>
                  <li style={{ textIndent: '1rem' }}>{commonPoints[userId][index]}</li>
                </ul>
              ))}
            </div>
            <button type="button" className={classes.talkButton}>
              Let&apos;s talk!
            </button>
          </div>
        ))}
      </div>
      <h3 className={classes.subTitle}>People who liked you</h3>
      <div>
        {Object.keys(recommendedUsersByLikes).map((userId) => (
          <div key={userId} className={classes.container}>
            <img src={recommendedUsersByLikes[userId].photo} className={classes.photo}></img>
            <div className={classes.likes}>
              <div>
                <ThumbUpAltIcon style={{ fontSize: '1rem' }} className={classes.ThumbUp} />
              </div>
              <div className={classes.liked_num}>
                {recommendedUsersByLikes[userId].likedNum > 99 ? '99+' : recommendedUsersByLikes[userId].likedNum}
              </div>
            </div>
            <h3 className={classes.name}>{recommendedUsersByLikes[userId].name}</h3>
            <div className={classes.hobbies}>
              <p>Common interests:</p>
              {Object.keys(commonPoints[userId]).map((index) => (
                <ul key={index} style={{ listStyleType: 'none' }}>
                  <li style={{ textIndent: '1rem' }}>{commonPoints[userId][index]}</li>
                </ul>
              ))}
            </div>
            <button type="button" className={classes.talkButton}>
              Let&apos;s talk!
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}
