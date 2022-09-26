import React from 'react'
import classes from '@/components/home/style.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import { UserInfoContentType } from '@/utils/types'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

type Props = {
  user: UserInfoContentType
  id: string
  transferToProfile: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const ProfileCard = (props: Props) => {
  const userInfo = useRecoilValue(userInfoState)
  const myId = Object.keys(userInfo)[0]
  const isSecretMode = userInfo[myId].isSecretMode

  const fetchFamiliarity = () => {
    // const params = { loginUser: myId, other: props.Id }
    // const query = new URLSearchParams(params)
    // const response = await fetch(`${process.env.API_ENDPOINT}/home`)
    return 5
  }
  const familiarity = fetchFamiliarity()

  return (
    <React.Fragment>
      <div className={classes.card}>
        <div className={classes.image_frame}>
          <img
            src={props.user.photo}
            alt=""
            onClick={(event) => props.transferToProfile(event)}
            id={props.id}
            style={isSecretMode ? { filter: `blur(${familiarity}px)` } : null}
          />
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
