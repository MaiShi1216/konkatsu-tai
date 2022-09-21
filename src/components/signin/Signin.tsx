import React, { useState } from 'react'
import classes from '@/components/signin/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

type ResJson = {
  name: string
}

export const Signin = () => {
  const [message, setMessage] = useState<string>(undefined)
  const [isShown, setIsSHown] = useState(false)
  const togglePassword = () => {
    setIsSHown((isShown) => !isShown)
  }

  const fetchSample = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/signin`, {
      method: 'POST',
    })
    const resJson: ResJson = await response.json()
    setMessage(resJson.name)
  }

  return (
    <>
      <div className={classes.container}>
        <Header />
        <h3>eMail adress</h3>
        <input
          placeholder="Enter your email adress"
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <p>{message}</p>
        <h3>Password</h3>
        <input placeholder="Enter your Password" />
        <div className="checkbox-container">
          <label htmlFor="checkbox">Show password?</label>
          <input id="checkbox" type="checkbox" checked={isShown} onChange={togglePassword} />
        </div>

        <button className={classes.submitButton} onClick={fetchSample}>
          Sign In
        </button>

        <button className={classes.submitButton} onClick={fetchSample}>
          Sign Up
        </button>

        <Footer />
      </div>
    </>
  )
}
