import React from 'react'
//import { Title } from '@/components/home/Title'
//import { Footer } from '@/components/home/Footer'
import { Main } from '@/components/home/Main'
import * as styles from '@/components/home/Home.css'

export const Home = () => {
  return (
    <React.Fragment>
      <p className={styles.test}>Hello</p>
      <Main />
    </React.Fragment>
  )
}
