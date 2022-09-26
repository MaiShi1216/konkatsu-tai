import React from 'react'
import classes from '@/components/profile/style.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import Button from '@mui/material/Button'
import { useLocation } from 'react-router-dom'
import { UserInfoContentType, UserInfoType } from '@/utils/types'

type UserIdInfo = {
  id: string
}

export const Main = () => {
  const location = useLocation()
  const [selectUser, setSelectUser] = React.useState(location.state as UserIdInfo)
  const [user, setUser] = React.useState({} as UserInfoContentType)
  const [userLikedNum, setUserLikedNum] = React.useState(0)
  const [likeButtonDisable, setLikeButtonDisable] = React.useState(false)

  const fetchSelectUser = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/profile`, {
      method: 'GET',
    })
    const resJson: UserInfoType = await response.json()
    const user = resJson[selectUser.id]
    setUser(user)
    setUserLikedNum(user.likedNum)
  }

  React.useEffect(() => {
    fetchSelectUser().catch((error) => console.error(error))
  }, [])

  const likeCountUp = async () => {
    const putParam = {
      likedNum: userLikedNum + 1,
    }
    const parameter = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(putParam),
    }
    const response = await fetch(`${process.env.API_ENDPOINT}/profile?userId=${selectUser.id}`, parameter)
    const resJson: { message: string } = await response.json()

    if (resJson.message === 'OK') {
      setUserLikedNum(userLikedNum + 1)
    }

    if (!likeButtonDisable) {
      setLikeButtonDisable(true)
    }
  }

  return (
    <div className={classes.main}>
      <div className={classes.image_frame}>
        <img src={user.photo} alt="" />
      </div>
      <div className={classes.name}>{user.nickname}</div>
      <div className={classes.like}>
        <ThumbUpAltIcon />
        <div className={classes.liked_number}>{userLikedNum}</div>
      </div>
      <div className={classes.self_intro}>
        <h2>Self Introduction</h2>
        <p>{user.selfIntro}</p>
      </div>
      <div className={classes.hobby_container}>
        <h2>Hobbies</h2>
        <div className={classes.hobby_items}>
          {user.hobbies?.map((hobby) => (
            <p key={hobby} className={classes.hobby}>
              {hobby}
            </p>
          ))}
        </div>
      </div>
      <div className={classes.favorite_container}>
        <h2>Favorite types</h2>
        <div className={classes.favorite_items}>
          {user.favorites?.map((favorite) => (
            <p key={favorite} className={classes.favorite}>
              {favorite}
            </p>
          ))}
        </div>
      </div>
      <div className={classes.button}>
        <Button variant="contained" disabled={likeButtonDisable} onClick={likeCountUp}>
          <p>LIKE!!</p>
          <ThumbUpAltIcon />
        </Button>
      </div>
    </div>
  )
}