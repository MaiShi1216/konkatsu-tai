import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import classes from '@/components/error/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

/* for development */
import { useRecoilState } from 'recoil'
import { userInfoState } from '@/atoms/userInfoAtom'
import { UserInfoType, UserInfoContentType } from '@/utils/types'

type ResJson = {
  name: string
}

export const Error = () => {
  return (
    <>
      <Header menuExist={false} />
      <div className={classes.container}>
        <h2>404 Page not found.</h2>
        <p>Pages</p>
        <ul>
          <li>
            <Link to="/signin">Sign in</Link>
          </li>
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/">Member list</Link>
          </li>
          <li>
            <Link to="/matched">Matched members</Link>
          </li>
          <li>
            <Link to="/edit"> Change user information</Link>
          </li>
          <li>
            <Link to="/recommended">Recommended members</Link>
          </li>
          <li>
            <Link to="/chat">chat</Link>
          </li>
        </ul>
      </div>
      <div className={classes.footerContainer}>
        <Footer />
      </div>
    </>
  )
}

const testUserData: UserInfoType = {
  '3f328652-f4bb-4254-972a-d70489794a25': {
    name: 'Shohei Ohtani',
    email: 'Sho@gmail.com',
    password: 'sho',
    nickname: 'Sho',
    hobbies: ['baseball', 'basketball', 'soccer'],
    favorites: ['passive', 'honest'],
    photo:
      'data:image/jpeg;base64,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',
    selfIntro: 'I rather like baseball than curry.',
    likedNum: 0,
    isSecretMode: false,
  },
}
