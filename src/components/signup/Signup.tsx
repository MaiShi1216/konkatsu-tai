import React, { useState } from 'react'
import classes from '@/components/signup/style.css'
import { Header } from '@/components/header/Header'

import { Footer } from '@/components/footer/Footer'
import { Form } from '@/components/form/Form'
import { CheckButton } from '@/components/checkButton/CheckButton'

import { useCheckBoxes } from '@/components/signup/useCheckBoxes'

import { useRecoilState } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'

type ResJson = {
  userId: string
}

type UserInfoContentType = {
  name?: string
  password?: string
  email?: string
  nickname: string
  photo: string
  favorites: string[]
  hobbies: string[]
  likedNum?: number
  selfIntro: string
  isSecretMode: boolean
}

type UserInfoType = {
  [key in string]: UserInfoContentType
}

const originHobbiesList: string[] = ['soccer', 'tennis', 'basketball', 'golf', 'baseball', 'movie', 'music']
const originFavoriteList: string[] = ['kind', 'passive', 'friendly', 'outgoing', 'funny', 'polite', 'honest']
const privateInfos = ['name', 'password', 'email']

export const Signup = () => {
  const [name, setName] = useState<string>(undefined)
  const [email, setEmail] = useState<string>(undefined)
  const [password, setPassword] = useState<string>(undefined)
  const [nickname, setNickname] = useState<string>(undefined)
  const [hobbies, handleHobbies] = useCheckBoxes([])
  const [favorites, handleFavorites] = useCheckBoxes([])
  const [isSecret, setIsSecret] = useState<boolean>(false)
  const [image, setImage] = useState<File>(undefined)
  const [selfIntro, setSelfIntro] = useState<string>(undefined)
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)

  const handleSignup = async () => {
    const b64img = await encodeImgToBase64()

    const newUserInfo: UserInfoContentType = {
      name,
      email,
      password,
      nickname,
      hobbies,
      favorites,
      isSecretMode: isSecret,
      photo: b64img,
      selfIntro,
    }

    try {
      const response = await fetch(`${process.env.API_ENDPOINT}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUserInfo),
      })
      if (response.status === 200) {
        privateInfos.forEach((key) => delete newUserInfo[key])
        const resJson: ResJson = await response.json()

        const storedInfo: UserInfoType = { [resJson.userId]: newUserInfo }
        setUserInfo(storedInfo)
        window.location.href = '/'
      } else {
        console.error('err')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const encodeImgToBase64 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (image === undefined) reject('no image uploaded')

      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.readAsDataURL(image)
    })
  }

  return (
    <div className={classes.container}>
      <Header />

      <h2>Sign Up</h2>
      <h3>Enter your information</h3>
      <Form placeholder="Name" label="Name" type="text" setter={setName} editEnable={true} />
      <Form placeholder="Mail" label="Mail" type="text" setter={setEmail} editEnable={true} />
      <Form placeholder="Password" label="Password" type="password" setter={setPassword} editEnable={true} />
      <Form placeholder="Nickname" label="Nickname" type="text" setter={setNickname} editEnable={true} />

      <h3>Enter your introduction</h3>
      <textarea
        cols={30}
        rows={10}
        className={classes.selfIntro}
        onChange={(e) => setSelfIntro(e.target.value)}
        placeholder="Enter your introduction"
      ></textarea>

      <div className={classes.photoUpload}>
        <h3>Upload your photo</h3>
        <input
          type="file"
          accept="image/*"
          id="photo"
          onChange={(e) => {
            setImage(e.target.files[0])
          }}
        ></input>
      </div>

      <div>
        <h3>Select your hobbies</h3>
        <div className={classes.buttonsContainer}>
          {originHobbiesList.map((hobby) => (
            <CheckButton key={hobby} label={hobby} type="hobby" setter={handleHobbies} initChecked={false} />
          ))}
        </div>
      </div>

      <div>
        <h3>Select your favorite types</h3>
        <div className={classes.buttonsContainer}>
          {originFavoriteList.map((favorite) => (
            <CheckButton key={favorite} label={favorite} type="favorite" setter={handleFavorites} initChecked={false} />
          ))}
        </div>
      </div>

      <div>
        <h3>Select Operating mode</h3>
        <input
          type="checkbox"
          id="Secret"
          onChange={(e) => {
            setIsSecret(e.target.checked)
          }}
        />
        <label htmlFor="Secret">Secret Mode</label>
      </div>
      <div>
        <button className={classes.submitButton} onClick={handleSignup}>
          Sign up
        </button>
      </div>

      <Footer />
    </div>
  )
}
