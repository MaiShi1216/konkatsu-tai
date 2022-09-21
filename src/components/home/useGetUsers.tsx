import React from 'react'
// import { useRecoilValue, useRecoilState } from 'recoil'
// import { userInfoState } from '@/atoms/userInfoAtom'

type UserInfo = {
  name?: string
  password?: string
  email?: string
  nickname: string
  photo: string
  favorites: string[]
  hobbies: string[]
  likedNum: number
  selfIntro: string
  isSecretMode: boolean
}

type User = {
  [key in string]: UserInfo
}

type TypeGetUsers = {
  Users: User
  transferToProfile: () => void
}

const useGetUsers = (): TypeGetUsers => {
  const [Users, setUsers] = React.useState<User>({})

  const fetchData = async () => {
    const response = await fetch(`${process.env.API_ENDPOINT}/home`, {
      method: 'GET',
    })
    const resJson: User = await response.json()
    return resJson
  }

  React.useEffect(() => {
    fetchData()
      .then((resJson) => {
        setUsers(resJson)
      })
      .catch((error) => console.log(error))
  }, [])

  const transferToProfile = () => {
    window.location.href = '/profile'
  }

  return { Users, transferToProfile }
}

export default useGetUsers
