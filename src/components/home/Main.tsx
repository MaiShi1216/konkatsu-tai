import React from 'react'
import { ProfileCard } from '@/components/home/ProfileCard'
import classes from '@/components/home/style.css'

export const Main = () => {
  return (
    <div className={classes.container}>
      <ProfileCard />
      <ProfileCard />
      {/* <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard /> */}
    </div>
  )
}
