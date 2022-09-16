import React, { useState } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/signup/style.css'

type ResJson = {
  name: string
}

export const Signup = () => {
  const [message, setMessage] = useState(undefined)

  const fetchSample = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/sample`, {
      method: 'GET',
    })
    const resJson: ResJson = await response.json()
    setMessage(resJson.name)
  }

  return (
    <div className={classes.container}>
      <Header />
      <p>This is a Signup component.</p>
      <button onClick={fetchSample}>Execute fetch!</button>
      <p>{message}</p>
      <Footer />
    </div>
  )
}
