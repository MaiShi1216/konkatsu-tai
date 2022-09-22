import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { paths } from '@/utils/paths'

import { Sample } from '@/components/sample/Sample'
import { Signup } from '@/components/signup/SignUp'
import { Matched } from '@/components/matched/Matched'
import { Recommended } from '@/components/recommended/Recommended'
import { ErrorPage } from '@/components/errorPage/ErrorPage'

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={paths.sample} element={<Sample />} />
          <Route path={paths.signup} element={<Signup mode="create" />} />
          <Route path={paths.edit} element={<Signup mode="edit" />} />
          <Route path={paths.matched} element={<Matched />} />
          <Route path={paths.recommended} element={<Recommended />} />
          <Route path={'*'} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}
