import React from 'react'
import { Signin } from '@/components/signin/Signin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { paths } from '@/utils/paths'
import { Sample } from '@/components/sample/Sample'
import { Enroll } from '@/components/enroll/Enroll'
import { Home } from '@/components/home/Home'
import { Matched } from '@/components/matched/Matched'
import { Profile } from '@/components/profile/Profile'
import { Recommended } from '@/components/recommended/Recommended'
import { Error } from '@/components/error/Error'
import { Chat } from '@/components/chat/Chat'

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={paths.sample} element={<Sample />} />
          <Route path={paths.chat} element={<Chat />} />
          <Route path={paths.signin} element={<Signin />} />
          <Route path={paths.signup} element={<Enroll mode="create" />} />
          <Route path={paths.edit} element={<Enroll mode="edit" />} />
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.matched} element={<Matched />} />
          <Route path={paths.profile} element={<Profile />} />
          <Route path={paths.recommended} element={<Recommended />} />
          <Route path={'*'} element={<Error />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}
