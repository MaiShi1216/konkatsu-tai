import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { sampleState } from '@/atoms/userInfoAtom'

type ResJson = {
  name: string
}

export const Sample = () => {
  const [message, setMessage] = useState(undefined)
  const [sample, setSample] = useRecoilState(sampleState)

  const fetchSample = async (): Promise<void> => {
    const response = await fetch(`${process.env.API_ENDPOINT}/sample`, {
      method: 'GET',
    })
    const resJson: ResJson = await response.json()
    setMessage(resJson.name)
  }

  return (
    <>
      <p>This is a sample component.</p>
      <button onClick={fetchSample}>Execute fetch!</button>
      <p>{message}</p>
      <button
        onClick={() => {
          setSample('Hello, Recoil! When you refresh browser or screen transition, you can store this state.')
        }}
      >
        Store `&quot;`Hello, Recoil!`&quot;` into atom!
      </button>
      <p>{sample}</p>
    </>
  )
}
