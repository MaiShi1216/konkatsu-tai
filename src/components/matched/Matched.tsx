import React, { useState } from 'react'

type ResJson = {
  name: string,
  password : string,
  nickname : string,
  photo : string,
  sex :string,
  birthday : Date,
  email : string,
  favoriteTypes : string,
  hobbies : string,
  likedNum : number,
  selfIntro : string,
  isHidden : any
}

export const Matched = () => {
  //const [message, setMessage] = useState(undefined)
  const [message, setMessage] = useState({})

  const fetchSample = async (): Promise<void> => {
    // const userId = "a001"; //最終的にはグローバル変数で受け取る？
    // const request = await fetch(`${process.env.API_ENDPOINT}/matched`, {
    //   method: 'POST',
    //   body: userId
    // })
    const response = await fetch(`${process.env.API_ENDPOINT}/matched`, {
      method: 'GET'
    })
    const resJson: ResJson = await response.json()
    //setMessage(resJson.name)
    setMessage(resJson);
    //setMessage(resJson.map((item)=><p>item</p>));
    console.log(resJson);
  }

  return (
    <>
      <p>This is a Matched component.</p>
      <button onClick={fetchSample}>See matched members!</button>
      {/* <p>{message}</p> */}
      <ul>
        {Object.keys(message).map(key => (
          <li key={key}>
            {message[key].name}
            <br></br>
            <img src={message[key].photo} width="100%"></img>
            <button>Let's talk!!</button>
          </li>
        ))}
      </ul>
    </>
  )
}
// base64エンコードは下記を使用
// https://web-toolbox.dev/tools/base64-encode-image
