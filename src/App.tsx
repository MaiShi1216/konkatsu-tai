import React from 'react'
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
          <Route path={paths.signup} element={<Signup mode="create" />} />
          <Route path={paths.edit} element={<Signup mode="edit" />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  )
}
