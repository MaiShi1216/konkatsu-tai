import React, { useState } from 'react'
import classes from '@/components/signin/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'
import { response } from 'express'

type ResJson = {
  name: string
}

export const Signin = () => {
  const [mail, setMail] = useState<string>(undefined)
  const [password, setPassword] = useState<string>(undefined)
  // const [userInfo, setUserInfo] = useRecoilState(userInfoState)
  const [isShown, setIsShown] = useState(false)
  const togglePassword = () => {
    setIsShown((isShown) => !isShown)
  }

  // const fetchSample = async (): Promise<void> => {
  //   const response = await fetch(`${process.env.API_ENDPOINT}/signin`, {
  //     method: 'POST',
  //   })
  //   const resJson: ResJson = await response.json()
  //   setMail(resJson.name)
  // }

  // try {
  //   const response = await fetch(`${process.env.API_ENDPOINT}/signin`, {
  //     method: 'POST',
  //     headers: { 'content-Type': 'application/json' },
  //     body: JSON.stringify(newUserInfo),
  //   })
  //   if (response.status === 200) {
  //     privateInfos.forEach((key) => delete newUserInfo[key])
  //     const resJson: ResJson = await response.json()

  //     const storedInfo = { [resJson.userId]: newUserInfo }
  //     setUserInfo(storedInfo)
  //     window.location.href = '/'
  //   } else {
  //     console.error('err')
  //   }
  // } catch (err) {
  //   console.error(err)
  // }
  // }

  const handleClick = () => {
    const signinData = { mail: mail, password: password }
    const url = 'http://localhost:8081/signin'
    const opt = {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(signinData),
    }
    // const response = fetch(url, opt) // この行は一旦コメントアウト
    const response = { // 一旦はbackendから正常応答がきたと仮置き
      status: 200,
      "3f328652-f4bb-4254-972a-d70489794a25": {
        photo: ***,
        name: ***,

      }

      // これ以降にresponseに対する処理を記載
      // recoilにデータを保存して、画面遷移する
    }
  }
  // if (response.status === 200) {
  //   window.location.href = '/'
  // } else {
  //   console.error('err')
  // }
  // } catch (err) {
  //   console.error(err)
  // }

  return (
    <div className={classes.container}>
      <Header />
      <h3>eMail Adress</h3>
      <input
        type="text"
        placeholder="Enter your email adress"
        onChange={(e) => {
          setMail(e.target.value)
        }}
      />
      <h3>Password</h3>
      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e) => {
          setPassword(e.target.value)
        }}
      />
      <button className={classes.submitButton} onClick={handleClick}>
        Signin
      </button>
      <Footer />
    </div>
  )
}
