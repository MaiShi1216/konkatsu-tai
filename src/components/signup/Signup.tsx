import React, { useState } from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import classes from '@/components/signup/style.css'

type ResJson = {
  name: string
}

export const Signup = () => {
  return (
    <div className={classes.container}>
      <Header />
      <h2>Sign Up</h2>
      <h3>Input your information</h3>
      <div className={classes.textBox}>
        <p>Name</p>
        <input className={classes.input} type="text" placeholder="Name" />
      </div>
      <div className={classes.textBox}>
        <p>Mail</p>
        <input className={classes.input} type="text" placeholder="Mail" />
      </div>
      <div className={classes.textBox}>
        <p>Password</p>
        <input className={classes.input} type="text" placeholder="Password" />
      </div>
      <div className={classes.textBox}>
        <p>Nickname</p>
        <input className={classes.input} type="text" placeholder="Nickname" />
      </div>

      <div className={classes.photoUpload}>
        <h3>Upload your photo</h3>
        <input type="file" accept="image/*"></input>
      </div>

      <div>
        <h3>Select your hobbies</h3>
        <div className={classes.buttonsContainer}>
          <input id="1" type="checkbox" className={classes.inputHobbyButton}></input>
          <label htmlFor="1" className={classes.hobbyButton}>
            tennis
          </label>
          <input id="2" type="checkbox" className={classes.inputHobbyButton}></input>
          <label htmlFor="2" className={classes.hobbyButton}>
            tennis
          </label>
          <input id="3" type="checkbox" className={classes.inputHobbyButton}></input>
          <label htmlFor="3" className={classes.hobbyButton}>
            tennis
          </label>
          <input id="4" type="checkbox" className={classes.inputHobbyButton}></input>
          <label htmlFor="4" className={classes.hobbyButton}>
            tennis
          </label>
          <input id="5" type="checkbox" className={classes.inputHobbyButton}></input>
          <label htmlFor="5" className={classes.hobbyButton}>
            tennis
          </label>
          <input id="6" type="checkbox" className={classes.inputHobbyButton}></input>
          <label htmlFor="6" className={classes.hobbyButton}>
            tennis
          </label>
          <input id="7" type="checkbox" className={classes.inputHobbyButton}></input>
          <label htmlFor="7" className={classes.hobbyButton}>
            tennis
          </label>
        </div>
      </div>

      <div>
        <h3>Select your favorite types</h3>
        <div className={classes.buttonsContainer}>
          <input id="1a" type="checkbox" className={classes.inputTypeButton}></input>
          <label htmlFor="1a" className={classes.typeButton}>
            tennis
          </label>
          <input id="2a" type="checkbox" className={classes.inputTypeButton}></input>
          <label htmlFor="2a" className={classes.typeButton}>
            tennis
          </label>
          <input id="3a" type="checkbox" className={classes.inputTypeButton}></input>
          <label htmlFor="3a" className={classes.typeButton}>
            tennis
          </label>
          <input id="4a" type="checkbox" className={classes.inputTypeButton}></input>
          <label htmlFor="4a" className={classes.typeButton}>
            tennis
          </label>
          <input id="5a" type="checkbox" className={classes.inputTypeButton}></input>
          <label htmlFor="5a" className={classes.typeButton}>
            tennis
          </label>
          <input id="6a" type="checkbox" className={classes.inputTypeButton}></input>
          <label htmlFor="6a" className={classes.typeButton}>
            tennis
          </label>
          <input id="7a" type="checkbox" className={classes.inputTypeButton}></input>
          <label htmlFor="7a" className={classes.typeButton}>
            tennis
          </label>
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
