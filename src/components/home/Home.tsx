import React from 'react'
import classes from '@/components/home/style.css'
import { Main } from '@/components/home/Main'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

export const Home = () => {
  return (
    <div className={classes.main}>
      <Header />
      <Main />
      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  )
}
