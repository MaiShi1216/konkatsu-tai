import React from 'react'
//import { Title } from '@/components/home/Title'
//import { Footer } from '@/components/home/Footer'
import { Main } from '@/components/home/Main'
import classes from '@/components/home/style.css'
import { ProfileCard } from '@/components/home/ProfileCard'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

export const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <Footer />
    </React.Fragment>
  )
}
