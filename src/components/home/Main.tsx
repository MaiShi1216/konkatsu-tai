import React from 'react'
import { ProfileCard } from '@/components/home/ProfileCard'
import classes from '@/components/home/style.css'
import useGetUsers from '@/components/home/useGetUsers'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

export const Main = () => {
  const { Users, transferToProfile } = useGetUsers()
  const userInfo = useRecoilValue(userInfoState)
  const myId = Object.keys(userInfo)[0]

  return (
    <div className={classes.container}>
      {Object.keys(Users)
        .filter((key) => key !== myId)
        .map((key) => {
          return <ProfileCard key={key} Id={key} User={Users[key]} transferToProfile={transferToProfile} />
        })}
    </div>
  )
}
