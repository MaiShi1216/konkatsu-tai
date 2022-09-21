import React from 'react'
import classes from '@/components/home/style.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

type Props = {
  User: UserInfo
  transferToProfile: () => void
}

type UserInfo = {
  name?: string
  password?: string
  email?: string
  nickname: string
  photo: string
  favorites: string[]
  hobbies: string[]
  likedNum: number
  selfIntro: string
  isSecretMode: boolean
}

export const ProfileCard = (props: Props) => {
  return (
    <React.Fragment>
      <div className={classes.card}>
        <div className={classes.image_frame} onClick={props.transferToProfile}>
          <img src={props.User.photo} alt="" />
        </div>
        <div className={classes.name}>{props.User.name}</div>
        <div className={classes.like}>
          <div>
            <ThumbUpAltIcon style={{ fontSize: '1rem' }} />
          </div>
          <div className={classes.liked_num}>{props.User.likedNum > 99 ? '99+' : props.User.likedNum}</div>
        </div>
      </div>
    </React.Fragment>
  )
}
