import React, { useState, useEffect } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/matched/style.css'
import { UserInfoContentType, UserInfoType } from '@/utils/types'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

type Familiarity = {
  familiarity?: number
}

type UserInfoTypeWithFamiliarity = {
  [key in string]: UserInfoContentType & Familiarity
}

export const Matched = () => {
  const [matchedUsers, setMatchedUsers] = useState<UserInfoTypeWithFamiliarity>({})
  const navigate = useNavigate()
  const transferToChat = (userId) => {
    navigate('/chat', { state: { partnerId: userId } })
  }

  const userInfo = useRecoilValue(userInfoState)
  const myId = Object.keys(userInfo)[0]
  const isSecretMode = userInfo[myId].isSecretMode

  const fetchMatched = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/matched?userId=${myId}`, {
      method: 'GET',
    })
    const resJson: UserInfoTypeWithFamiliarity = await response.json()
    setMatchedUsers(resJson)
  }

  useEffect(() => {
    fetchMatched().catch((err) => {
      console.error(err)
    })
  }, [])

  return (
    <div className={classes.main}>
      <Header menuExist={true} />
      <div>
        {Object.keys(matchedUsers).map((userId) => (
          <div key={userId} className={classes.container} onClick={() => transferToChat(userId)}>
            <img
              src={matchedUsers[userId].photo}
              className={classes.photo}
              style={
                isSecretMode
                  ? { filter: `blur(${matchedUsers[userId].familiarity > 5 ? 0 : 10 - matchedUsers[userId].familiarity * 2}px)` }
                  : null
              }
            ></img>
            <h3 className={classes.name}>{matchedUsers[userId].nickname}</h3>
            <p className={classes.message}>{matchedUsers[userId].selfIntro}</p>
          </div>
        ))}
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  )
}
