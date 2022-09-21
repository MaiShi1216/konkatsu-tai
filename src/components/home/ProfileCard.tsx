import React from 'react'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'
import classes from '@/components/home/style.css'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

type ResJson = {
  name: string
}

export const ProfileCard = () => {
  const userInfo = useRecoilValue(userInfoState)
  const [image, setImage] = React.useState('')
  const [name, setName] = React.useState('')
  const [likedNum, setLikedNum] = React.useState(undefined)

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.API_ENDPOINT}/home`, {
        method: 'GET',
      })
      const resJson: ResJson = await response.json()
      return resJson
    }

    fetchData()
      .then((resJson) => {
        // const usersObj = Object.assign({}, resJson)
        // delete usersObj[Object.keys(userInfo)[0]]
        // setImage(usersObj)
        const keys = Object.keys(resJson)
        setImage(resJson[keys[0]].photo)
        setName(resJson[keys[0]].name)
        setLikedNum(resJson[keys[0]].likedNum)
        // setLikedNum(resJson[keys[0].likedNum])
      })
      .catch((error) => console.log(error))
  })

  return (
    <React.Fragment>
      <div className={classes.card}>
        <div className={classes.image_frame}>
          <img src={image} alt="" />
        </div>
        <div className={classes.name}>{name}</div>
        <div className={classes.like}>
          <div>
            <ThumbUpAltIcon style={{ fontSize: '1rem' }} />
          </div>
          <div className={classes.liked_num}>{likedNum > 99 ? '99+' : likedNum}</div>
        </div>
      </div>
    </React.Fragment>
  )
}
