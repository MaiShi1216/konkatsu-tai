import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { paths } from '@/utils/paths'

import { Sample } from '@/components/sample/Sample'
import { Signup } from '@/components/signup/SignUp'
import { Matched } from '@/components/matched/Matched'
import { Chat } from '@/components/chat/Chat'

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={paths.sample} element={<Sample />} />
          <Route path={paths.chat} element={<Chat />} />
          <Route path={paths.signup} element={<Signup />} />
          <Route path={paths.matched} element={<Matched />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}
