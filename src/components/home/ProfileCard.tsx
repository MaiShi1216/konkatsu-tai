import React from 'react'
import classes from '@/components/home/style.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { UserInfoContentType } from '@/utils/types'

type Props = {
  user: UserInfoContentType
  id: string
  transferToProfile: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const ProfileCard = (props: Props) => {
  return (
    <React.Fragment>
      <div className={classes.card}>
        <div className={classes.image_frame}>
          <img src={props.user.photo} alt="" onClick={(event) => props.transferToProfile(event)} id={props.id} />
        </div>
        <div className={classes.name}>{props.user.nickname}</div>
        <div className={classes.like}>
          <div>
            <ThumbUpAltIcon style={{ fontSize: '1rem' }} />
          </div>
          <div className={classes.liked_num}>{props.user.likedNum > 99 ? '99+' : props.user.likedNum}</div>
        </div>
      </div>
    </React.Fragment>
  )
}
