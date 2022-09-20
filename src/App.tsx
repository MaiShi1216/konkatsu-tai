import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { paths } from '@/utils/paths'

import { Sample } from '@/components/sample/Sample'
import { Signup } from '@/components/signup/SignUp'
import { Chat } from '@/components/chat/Chat'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.sample} element={<Sample />} />
        <Route path={paths.chat} element={<Chat />} />
        <Route path={paths.signup} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}
