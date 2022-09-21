/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { useState, FC } from 'react'
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

type PropsType = {
  mode: 'create' | 'edit'
}

const originHobbiesList: string[] = ['soccer', 'tennis', 'basketball', 'golf', 'baseball', 'movie', 'music']
const originFavoriteList: string[] = ['kind', 'passive', 'friendly', 'outgoing', 'funny', 'polite', 'honest']
const privateInfos = ['name', 'password', 'email']

export const Signup: FC<PropsType> = (props) => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [name, setName] = useState<string>(undefined)
  const [email, setEmail] = useState<string>(undefined)
  const [password, setPassword] = useState<string>(undefined)
  const [nickname, setNickname] = useState<string>(undefined)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [hobbies, handleHobbies] = useCheckBoxes(props.mode === 'create' ? [] : userInfo[Object.keys(userInfo)[0]].hobbies)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [favorites, handleFavorites] = useCheckBoxes(props.mode === 'create' ? [] : userInfo[Object.keys(userInfo)[0]].favorites)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [isSecret, setIsSecret] = useState<boolean>(props.mode === 'create' ? false : userInfo[Object.keys(userInfo)[0]].isSecretMode)
  const [image, setImage] = useState<File>(undefined)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const [selfIntro, setSelfIntro] = useState<string>(props.mode === 'create' ? undefined : userInfo[Object.keys(userInfo)[0]].selfIntro)

  const handleSignup = async () => {
    const b64img = await encodeImgToBase64()

    const newUserInfo: UserInfoContentType = {
      name: props.mode === 'create' ? name : undefined,
      email: props.mode === 'create' ? email : undefined,
      password,
      nickname,
      hobbies,
      favorites,
      isSecretMode: isSecret,
      photo: b64img,
      selfIntro,
      likedNum: 0,
    }

    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        `${process.env.API_ENDPOINT}/user?userId=${Object.keys(userInfo)[0]}`,
        // `${process.env.API_ENDPOINT}/user${props.mode === 'create' ? null : `?userId=${Object.keys(userInfo)[0]}`}`,
        {
          method: props.mode === 'create' ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newUserInfo),
        },
      )
      if (response.status === 200) {
        privateInfos.forEach((key) => delete newUserInfo[key])
        const resJson: ResJson = await response.json()

        const storedInfo: UserInfoType = { [resJson.userId]: newUserInfo }
        setUserInfo(storedInfo)
        // window.location.href = '/'
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

      <h2>{props.mode === 'create' ? 'Sign Up' : 'Edit'}</h2>
      <h3>{props.mode === 'create' ? 'Enter your information' : 'Edit your information'}</h3>
      <Form placeholder="Name" label="Name" type="text" setter={setName} editEnable={props.mode === 'create' ? true : false} />
      <Form placeholder="Mail" label="Mail" type="text" setter={setEmail} editEnable={props.mode === 'create' ? true : false} />
      <Form
        placeholder={props.mode === 'create' ? 'Password' : 'Enter current or new password'}
        label="Password"
        type="password"
        setter={setPassword}
        editEnable={true}
      />
      <Form
        placeholder="Nickname"
        label="Nickname"
        type="text"
        setter={setNickname}
        editEnable={true}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        initValue={props.mode === 'create' ? undefined : userInfo[Object.keys(userInfo)[0]].nickname}
      />

      <h3>{props.mode === 'create' ? 'Enter your introduction' : 'Edit your introduction'}</h3>
      <textarea
        cols={30}
        rows={10}
        className={classes.selfIntro}
        onChange={(e) => setSelfIntro(e.target.value)}
        placeholder="Enter your introduction"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        defaultValue={props.mode === 'create' ? undefined : userInfo[Object.keys(userInfo)[0]].selfIntro}
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
            <CheckButton
              key={hobby}
              label={hobby}
              type="hobby"
              setter={handleHobbies}
              initChecked={
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
                props.mode === 'create' ? false : userInfo[Object.keys(userInfo)[0]].hobbies.some((element) => element === hobby)
              }
            />
          ))}
        </div>
      </div>

      <div>
        <h3>Select your favorite types</h3>
        <div className={classes.buttonsContainer}>
          {originFavoriteList.map((favorite) => (
            <CheckButton
              key={favorite}
              label={favorite}
              type="favorite"
              setter={handleFavorites}
              initChecked={
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
                props.mode === 'create' ? false : userInfo[Object.keys(userInfo)[0]].favorites.some((element) => element === favorite)
              }
            />
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          defaultChecked={props.mode === 'create' ? false : userInfo[Object.keys(userInfo)[0]].isSecretMode}
        />
        <label htmlFor="Secret">Secret Mode</label>
      </div>
      <div>
        <button className={classes.submitButton} onClick={handleSignup}>
          {props.mode === 'create' ? 'Sign up' : 'Submit'}
        </button>
      </div>

      <Footer />
    </div>
  )
}
