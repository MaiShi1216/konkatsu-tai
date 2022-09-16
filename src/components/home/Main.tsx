import React from 'react'
import { ProfileCard } from '@/components/home/ProfileCard'
import classes from '@/components/home/Home.css'

export const Main = () => {
  return (
    <div className={classes.cards}>
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
      <ProfileCard />
    </div>
  )
}
