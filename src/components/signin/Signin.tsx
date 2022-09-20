import React, { useState } from 'react'
import classes from '@/components/signin/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { Form } from '@/components/form/Form'

type ResJson = {
  name: string
}

export const Signin = () => {
  const [message, setMessage] = useState(undefined)

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
        <h3>ID:</h3>
        <input
          placeholder="Enter your ID"
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <p>{message}</p>
        <h3>Password：サインインを押したら反映</h3>
        <input
          placeholder="Enter your Password"
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <p>{message}</p>

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
