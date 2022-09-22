import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { paths } from '@/utils/paths'
import { Sample } from '@/components/sample/Sample'
import { Signup } from '@/components/signup/SignUp'
import { Home } from '@/components/home/Home'
import { Matched } from '@/components/matched/Matched'
import { ErrorPage } from '@/components/errorPage/ErrorPage'
import { Chat } from '@/components/chat/Chat'

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={paths.sample} element={<Sample />} />
          <Route path={paths.chat} element={<Chat />} />
          <Route path={paths.signup} element={<Signup mode="create" />} />
          <Route path={paths.edit} element={<Signup mode="edit" />} />
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.matched} element={<Matched />} />
          <Route path={'*'} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}
