import React from 'react'
import { Main } from '@/components/home/Main'
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
