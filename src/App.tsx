import React from 'react'
import { Signin } from '@/components/signin/Signin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { paths } from '@/utils/paths'

import { Sample } from '@/components/sample/Sample'
import { Signup } from '@/components/signup/SignUp'

export const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={paths.sample} element={<Sample />} />
          <Route path={paths.signup} element={<Signup />} />
          <Route path={paths.signin} element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}
