import React, { useState } from 'react'
import classes from '@/components/footer/style.css'

type ResJson = {
  name: string
}

export const Footer = () => {
  return (
    <>
      <div className={classes.container}>
        <h1 className={classes.appName}>Copyright(c) 2022 Konkatsu-tai.inc</h1>
      </div>
    </>
  )
}
