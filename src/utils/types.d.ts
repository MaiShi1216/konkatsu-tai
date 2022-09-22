export type UserInfoContentType = {
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

export type UserInfoType = {
  [key in string]: UserInfoContentType
}
