import React from 'react'
import { ProfileCard } from '@/components/home/ProfileCard'
import classes from '@/components/home/style.css'
import useGetUsers from '@/components/home/useGetUsers'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

export const Main = () => {
  const { users, transferToProfile } = useGetUsers()
  const userInfo = useRecoilValue(userInfoState)
  const myId = Object.keys(userInfo)[0]
  console.log(myId)

  return (
    <div className={classes.container}>
      {Object.keys(users)
        .filter((key) => key !== myId)
        .map((key) => {
          return <ProfileCard key={key} id={key} user={users[key]} transferToProfile={transferToProfile} />
        })}
    </div>
  )
}
