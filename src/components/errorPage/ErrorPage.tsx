import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import classes from '@/components/errorPage/style.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

type ResJson = {
  name: string
}

export const ErrorPage = () => {
  return (
    <>
      <Header />
      <div className={classes.container}>
        <h2>404 Page not found.</h2>
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
            <Link to="/recommended">Recommended members</Link>
          </li>
        </ul>
      </div>
      <div className={classes.footerContainer}>
        <Footer />
      </div>
    </>
  )
}
