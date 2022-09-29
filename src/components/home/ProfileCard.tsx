import React from 'react'
import classes from '@/components/home/style.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { UserInfoContentType } from '@/utils/types'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

type Familiarity = {
  familiarity?: number
}

type Props = {
  user: UserInfoContentType & Familiarity
  id: string
  transferToProfile: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const ProfileCard = (props: Props) => {
  const userInfo = useRecoilValue(userInfoState)
  const myId = Object.keys(userInfo)[0]
  const isSecretMode = userInfo[myId].isSecretMode

  return (
    <Card sx={{ maxWidth: 345 }} onClick={(event) => props.transferToProfile(event)}>
      <CardMedia component="img" image={props.user.photo} className={classes.card_media} />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.user.nickname}
        </Typography>
      </CardContent>
    </Card>
    // <React.Fragment>
    //   <div className={classes.card}>
    //     <div className={classes.image_frame}>
    //       <img
    //         src={props.user.photo}
    //         alt=""
    //         onClick={(event) => props.transferToProfile(event)}
    //         id={props.id}
    //         style={isSecretMode ? { filter: `blur(${props.user.familiarity > 5 ? 0 : 10 - props.user.familiarity * 2}px)` } : null}
    //       />
    //     </div>
    //     <div className={classes.name}>{props.user.nickname}</div>
    //     <div className={classes.like}>
    //       <div>
    //         <ThumbUpAltIcon style={{ fontSize: '1rem' }} />
    //       </div>
    //       <div className={classes.liked_num}>{props.user.likedNum > 99 ? '99+' : props.user.likedNum}</div>
    //     </div>
    //   </div>
    // </React.Fragment>
  )
}
