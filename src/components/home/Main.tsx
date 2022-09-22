import React from 'react'
import { ProfileCard } from '@/components/home/ProfileCard'
import classes from '@/components/home/style.css'
import useGetUsers from '@/components/home/useGetUsers'

export const Main = () => {
  const { Users, transferToProfile } = useGetUsers()
  const myId = '3f328652-f4bb-4254-972a-d70489794a25'

  return (
    <div className={classes.container}>
      {Object.keys(Users)
        .filter((key) => key !== myId)
        .map((key) => {
          return <ProfileCard key={key} User={Users[key]} transferToProfile={transferToProfile} />
        })}
    </div>
  )
}
