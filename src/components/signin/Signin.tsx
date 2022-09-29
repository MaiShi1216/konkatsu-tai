import React, { useState } from 'react'
import classes from '@/components/signin/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'
import e, { response } from 'express'
import { UserInfoType, UserInfoContentType } from '@/utils/types'
import { Navigate, useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'

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
          setErrorMsg('Error: ID or Password are wrong.\nPlease input again.')
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
        <h3>Enter your email address</h3>
        <TextField
          id="standard-basic"
          label="Email Address"
          variant="standard"
          onChange={(e) => {
            setMail(e.target.value)
          }}
        />
        <h3>Enter your password</h3>
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        {errorMsg === undefined ? null : <p className={classes.errorMsg}>{errorMsg}</p>}
        <button className={classes.submitButton} onClick={checkidAndPass}>
          Sign in
        </button>
        <button className={classes.signupButton} onClick={transferToSignUp}>
          Sign up
        </button>
        <div className={classes.footerContainer}>
          <Footer />
        </div>
      </div>
    </>
  )
}
