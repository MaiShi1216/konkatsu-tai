import React, { useState } from 'react'
import classes from '@/components/signin/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

type ResJson = {
  name: string
}

export const Signin = () => {
  const [mail, setMail] = useState<string>(undefined)
  const [isShown, setIsShown] = useState(false)
  const togglePassword = () => {
    setIsShown((isShown) => !isShown)
  }

  const fetchSample = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/signin`, {
      method: 'POST',
    })
    const resJson: ResJson = await response.json()
    setMail(resJson.name)
  }

  return (
    <div className={classes.container}>
      <Header />
      <h3>eMail Adress</h3>
      <input
        placeholder="Enter your email adress"
        onChange={(e) => {
          setMail(e.target.value)
        }}
      />
      <p>{mail}</p>
      <h3>Password</h3>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <input type={isShown ? 'text' : 'password'} placeholder="Enter your Password" className="input" />
        <div className="checkbox-container">
          <label htmlFor="checkbox">Show Password?</label>
          <input id="checkbox" type="checkbox" checked={isShown} onChange={togglePassword} />
        </div>
      </form>

      <button className={classes.submitButton} onClick={fetchSample}>
        Sign In
      </button>

      <button className={classes.submitButton} onClick={fetchSample}>
        Sign Up
      </button>

      <Footer />
    </div>
  )
}
