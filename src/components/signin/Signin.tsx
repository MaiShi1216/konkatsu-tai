import React, { useState } from 'react'

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
      <h1>ID</h1>
      <input placeholder="Enter your ID" />
      <h1>Password</h1>
      <input placeholder="Enter your Password" />
      <button onClick={fetchSample}>Sign In</button>
      <button onClick={fetchSample}>Sign Up</button>
      <p>{message}</p>
    </>
  )
}
