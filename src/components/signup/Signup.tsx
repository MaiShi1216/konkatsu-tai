import React, { useState } from 'react'
import classes from '@/components/signup/style.css'
import { Header } from '@/components/header/Header'

import { Footer } from '@/components/footer/Footer'
import { Form } from '@/components/form/Form'
import { CheckButton } from '@/components/checkButton/CheckButton'

import { useCheckBoxes } from '@/components/signup/useCheckBoxes'

type ResJson = {
  name: string
}

const originHobbiesList: string[] = ['soccer', 'tennis', 'basketball', 'golf', 'baseball', 'movie', 'music']
const originFavoriteList: string[] = ['kind', 'passive', 'friendly', 'outgoing', 'funny', 'polite', 'honest']

export const Signup = () => {
  const [name, setName] = useState<string>(undefined)
  const [mail, setMail] = useState<string>(undefined)
  const [pass, setPass] = useState<string>(undefined)
  const [nickname, setNickname] = useState<string>(undefined)
  const [hobbies, handleHobbies] = useCheckBoxes([])
  const [favorites, handleFavorites] = useCheckBoxes([])

  return (
    <div className={classes.container}>
      <Header />

      <h2>Sign Up</h2>
      <h3>Input your information</h3>
      <Form placeholder="Name" label="Name" type="text" setter={setName} editEnable={true} />
      <Form placeholder="Mail" label="Mail" type="text" setter={setMail} editEnable={true} />
      <Form placeholder="Password" label="Password" type="password" setter={setPass} editEnable={true} />
      <Form placeholder="Nickname" label="Nickname" type="text" setter={setNickname} editEnable={true} />

      <div className={classes.photoUpload}>
        <h3>Upload your photo</h3>
        <input type="file" accept="image/*"></input>
      </div>

      <div>
        <h3>Select your hobbies</h3>
        <div className={classes.buttonsContainer}>
          {originHobbiesList.map((hobby) => (
            <CheckButton key={hobby} label={hobby} type="hobby" setter={handleHobbies} initChecked={false} />
          ))}
        </div>
      </div>

      <div>
        <h3>Select your favorite types</h3>
        <div className={classes.buttonsContainer}>
          {originFavoriteList.map((favorite) => (
            <CheckButton key={favorite} label={favorite} type="favorite" setter={handleFavorites} initChecked={false} />
          ))}
        </div>
      </div>

      <div>
        <h3>Select Operating mode</h3>
        <input type="checkbox" id="Secret" />
        <label htmlFor="Hidden">Secret</label>
      </div>
      <div>
        <button className={classes.submitButton}>Sign up</button>
      </div>

      <Footer />
    </div>
  )
}
