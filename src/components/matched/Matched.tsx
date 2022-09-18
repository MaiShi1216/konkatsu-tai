import React, { useState } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/matched/style.css'

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
    // const request = await fetch(`${process.env.API_ENDPOINT}/matched`, {
    //   method: 'POST',
    //   body: userId
    // })
    const myId = "a001"; //最終的にはグローバル変数で受け取る？
    const query_params = new URLSearchParams({
      userId: myId
    });
    const response = await fetch(`${process.env.API_ENDPOINT}/matched?`+query_params, {
      method: 'GET'
    })
    // const response = await fetch(`${process.env.API_ENDPOINT}/matched`, {
    //   method: 'GET'
    // })
    const resJson: ResJson = await response.json()
    //setMessage(resJson.name)
    setMessage(resJson);
    //setMessage(resJson.map((item)=><p>item</p>));
    console.log(resJson);
  }

  return (
    <>
      <Header />
      <p>This is a Matched component.</p>
      <button onClick={fetchSample}>See matched members!</button>
      {/* <p>{message}</p> */}
      <div>
        {Object.keys(message).map(key => (
          <div key={key} className={classes.container}>
            {/* <br></br> */}
            <img src={message[key].photo} className={classes.photo}></img>
            <h3 className={classes.name}>{message[key].name}</h3>
            <p className={classes.message}>{message[key].selfIntro}</p>
            {/* <br></br> */}
            {/* <button>Let's talk!!</button> */}
          </div>
        ))}
      </div>
      {/* <ul>
        {Object.keys(message).map(key => (
          <li key={key}>
            {message[key].name}
            <br></br>
            <img src={message[key].photo} width="100%"></img>
            <p>{message[key].selfIntro}</p>
            <button>Let's talk!!</button>
          </li>
        ))}
      </ul> */}
      <Footer />
    </>
  )
}
// base64エンコードは下記を使用
// https://web-toolbox.dev/tools/base64-encode-image
