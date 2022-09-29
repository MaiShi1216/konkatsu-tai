import React from 'react'
import classes from '@/components/recommended/style.css'
import { useNavigate } from 'react-router-dom'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { UserInfoType, UserInfoContentType } from '@/utils/types'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

type Familiarity = {
  familiarity?: number
}

type UserInfoTypeWithFamiliarity = {
  [key in string]: UserInfoContentType & Familiarity
}

type Props = {
  users: UserInfoTypeWithFamiliarity
  hobby: UserInfoType
}

export const Main = (props: Props) => {
  const navigate = useNavigate()
  const userInfo = useRecoilValue(userInfoState)
  const myId = Object.keys(userInfo)[0]
  const isSecretMode = userInfo[myId].isSecretMode

  const transferToProfile = (userId) => {
    navigate('/profile', { state: { id: userId } })
  }

  return (
    <div>
      {Object.keys(props.users).map((userId) => (
        <div key={userId} className={classes.container}>
          <img
            src={props.users[userId].photo}
            className={classes.photo}
            style={
              isSecretMode
                ? { filter: `blur(${props.users[userId].familiarity > 5 ? 0 : 10 - props.users[userId].familiarity * 2}px)` }
                : null
            }
          />
          <div className={classes.name_likes}>
            <p className={classes.name}>{props.users[userId].nickname}</p>
            <div className={classes.likes}>
              <div>
                <ThumbUpAltIcon style={{ fontSize: '1rem' }} className={classes.thumbUp} />
              </div>
              <div className={classes.liked_num}>{props.users[userId].likedNum > 99 ? '99+' : props.users[userId].likedNum}</div>
            </div>
          </div>
          <div className={classes.hobbies}>
            <p>Similar hobbies:</p>
            <div className={classes.hobbiesList}>
              {Object.keys(props.hobby[userId]).map((index) => (
                <ul key={index} style={{ listStyleType: 'none' }}>
                  <li className={classes.hobby}>{props.hobby[userId][index]}</li>
                </ul>
              ))}
            </div>
          </div>
          <button type="button" className={classes.talkButton} onClick={() => transferToProfile(userId)}>
            View profile
          </button>
        </div>
      ))}
    </div>
  )
}
