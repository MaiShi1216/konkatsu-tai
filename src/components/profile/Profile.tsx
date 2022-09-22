import React from 'react'
import classes from '@/components/profile/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

export const Profile = (props) => {
  return (
    <React.Fragment>
      <Header />
      <div className={classes.image_frame}>
        <img src="" alt="" />
      </div>
      <div className={classes.name}>{props.name}</div>
      <div className={classes.like}>
        <ThumbUpAltIcon />
        <div className={classes.liked_number}>{props.likedNum}</div>
      </div>
      <div className={classes.self_intro}>
        <h2>Self Introduction</h2>
        <p>{props.selfIntro}</p>
      </div>
      <div className={classes.hobby}>{props.hobbies}</div>
      <div className={classes.favorite}>{props.favorites}</div>
      <Footer />
    </React.Fragment>
  )
}
