import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import classes from '@/components/header/style.css'

type ResJson = {
  name: string
}

export const Header = () => {
  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.appName}>Woven Marriage Hunting App</h1>
        <Link to="/error" className={classes.menu}>
          三
        </Link>
      </div>
    </>
  )
}
