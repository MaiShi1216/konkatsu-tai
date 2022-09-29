import React from 'react'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { Main } from '@/components/profile/Main'

export const Profile = () => {
  return (
    <React.Fragment>
      <Header menuExist={true} />
      <Main />
      <Footer />
    </React.Fragment>
  )
}
