import React from 'react'
// import { useRecoilValue, useRecoilState } from 'recoil'
// import { userInfoState } from '@/atoms/userInfoAtom'
import { UserInfoType } from '@/utils/types'
import { useNavigate } from 'react-router-dom'

type TypeGetUsers = {
  Users: UserInfoType
  transferToProfile: () => void
}

const useGetUsers = (): TypeGetUsers => {
  const [Users, setUsers] = React.useState<UserInfoType>({})
  const navigate = useNavigate()

  const fetchData = async () => {
    const response = await fetch(`${process.env.API_ENDPOINT}/home`, {
      method: 'GET',
    })
    const resJson: UserInfoType = await response.json()
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
    navigate('/profile')
  }

  return { Users, transferToProfile }
}

export default useGetUsers
