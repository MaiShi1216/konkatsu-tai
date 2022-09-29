import React from 'react'
import { UserInfoType } from '@/utils/types'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

type TypeGetUsers = {
  users: UserInfoType
  transferToProfile: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const useGetUsers = (): TypeGetUsers => {
  const [users, setUsers] = React.useState<UserInfoType>({})
  const navigate = useNavigate()
  const userInfo = useRecoilValue(userInfoState)
  const loginId = Object.keys(userInfo)[0]

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.API_ENDPOINT}/home?loginId=${loginId}`, { method: 'GET' })
    const resJson: UserInfoType = await response.json()
    return resJson
  }

  React.useEffect(() => {
    fetchUsers()
      .then((resJson) => {
        setUsers(resJson)
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
