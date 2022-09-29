import React from 'react'
import classes from '@/components/recommended/style.css'
import { useNavigate } from 'react-router-dom'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { UserInfoType } from '@/utils/types'

type Props = {
  users: UserInfoType
  hobby: UserInfoType
}

export const Main = (props: Props) => {
  const navigate = useNavigate()

  const transferToProfile = (userId) => {
    navigate('/profile', { state: { id: userId } })
  }

  return (
    <div>
      {Object.keys(props.users).map((userId) => (
        <div key={userId} className={classes.container}>
          <img src={props.users[userId].photo} className={classes.photo}></img>
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
            {Object.keys(props.hobby[userId]).map((index) => (
              <ul key={index} style={{ listStyleType: 'none' }}>
                <li className={classes.hobby}>{props.hobby[userId][index]}</li>
              </ul>
            ))}
          </div>
          <button type="button" className={classes.talkButton} onClick={() => transferToProfile(userId)}>
            View profile
          </button>
        </div>
      ))}
    </div>
  )
}
