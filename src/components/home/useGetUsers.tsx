import React from 'react'
import { UserInfoType, UserInfoContentType } from '@/utils/types'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

type Familiarity = {
  familiarity?: number
}

type UserInfoWithFamiliarity = {
  [key in string]: UserInfoContentType & Familiarity
}

type TypeGetUsers = {
  users: UserInfoWithFamiliarity
  transferToProfile: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const useGetUsers = (): TypeGetUsers => {
  const [users, setUsers] = React.useState<UserInfoWithFamiliarity>({})
  const navigate = useNavigate()
  const userInfo = useRecoilValue(userInfoState)
  const userId = Object.keys(userInfo)[0]

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.API_ENDPOINT}/home?userId=${userId}`, {
      method: 'GET',
    })
    const resUsers: UserInfoWithFamiliarity = await response.json()
    return resUsers
  }

  React.useEffect(() => {
    fetchUsers()
      .then((resUsers) => {
        setUsers(resUsers)
      })
      .catch((error) => console.log(error))
  }, [])

  const transferToProfile = (event) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const id = event.target.getAttribute('id')
    navigate('/profile', { state: { id: id } })
  }

  return { users, transferToProfile }
}

export default useGetUsers
