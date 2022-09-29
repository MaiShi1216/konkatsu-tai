import React, { useState } from 'react'
import classes from '@/components/signin/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'
import e, { response } from 'express'
import { UserInfoType, UserInfoContentType } from '@/utils/types'
import { Navigate, useNavigate } from 'react-router-dom'

type ResJson = {
  name: string
}

export const Signin = () => {
  const [mail, setMail] = useState<string>(undefined)
  const [password, setPassword] = useState<string>(undefined)
  const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoState)
  const [errorMsg, setErrorMsg] = useState(undefined)
  const navigate = useNavigate()

  const checkidAndPass = () => {
    const signinData = { mail: mail, password: password }
    const url = `${process.env.API_ENDPOINT}/signin`
    const opt = {
      method: 'POST',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify(signinData),
    }
    fetch(url, opt)
      .then((body) => body.json())
      .then((data) => {
        // data = { status: ***, response: *** }
        if (data.status === 200) {
          setUserInfo(data.response)
          navigate('/')
        } else if (data.status === 500) {
          setErrorMsg('Error:ID or Password are wrong.Please input again.')
        }
      })
      .catch((error) => {
        console.error(`${error.message}`)
        
      })
  }
  const transferToSignUp = () => {
    navigate('/signup')
  }

  return (
    <>
      <div className={classes.container}>
        <Header menuExist={false} />
        <div className={classes.text}>
          <p>Email Address</p>

          <input
            type="text"
            placeholder="Enter your email address"
            onChange={(e) => {
              setMail(e.target.value)
            }}
          />
          <p>Password</p>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <button
          className={classes.submitButton}
          onClick={checkidAndPass}
          placeholder="Sign in"
          onClick={(e) => {
            e.currentTarget.disabled = true; setErrorMsg(true)
          }}
          }}
        ></button>
        <button className={classes.signupButton} onClick={transferToSignUp}>
          Sign up
        </button>
        <p className="errorMsg">{errorMsg}</p>
        <div className={classes.footerContainer}>
          <Footer />
        </div>
      </div>
    </>
  )
}
