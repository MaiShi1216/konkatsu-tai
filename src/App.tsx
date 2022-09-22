import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { paths } from '@/utils/paths'
import { Sample } from '@/components/sample/Sample'
import { Signup } from '@/components/signup/SignUp'
import { Home } from '@/components/home/Home'
import { Matched } from '@/components/matched/Matched'
import { Profile } from '@/components/profile/Profile'
import { ErrorPage } from '@/components/errorPage/ErrorPage'

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={paths.sample} element={<Sample />} />
          <Route path={paths.signup} element={<Signup mode="create" />} />
          <Route path={paths.edit} element={<Signup mode="edit" />} />
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.matched} element={<Matched />} />
          <Route path={paths.profile} element={<Profile />} />
          <Route path={'*'} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}
