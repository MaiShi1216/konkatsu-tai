import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { paths } from '@/utils/paths'

import { Sample } from '@/components/sample/Sample'
import { Signup } from '@/components/signup/SignUp'
import { Matched } from '@/components/matched/Matched'

export const App = () => {
  return (
<<<<<<< HEAD
    <BrowserRouter>
      <Routes>
        <Route path={paths.sample} element={<Sample />} />
        <Route path={paths.signup} element={<Signup />} />
        <Route path={paths.matched} element={<Matched />} />
      </Routes>
    </BrowserRouter>
||||||| 1d440a9
    <BrowserRouter>
      <Routes>
        <Route path={paths.sample} element={<Sample />} />
        <Route path={paths.signup} element={<Signup />} />
      </Routes>
    </BrowserRouter>
=======
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path={paths.sample} element={<Sample />} />
          <Route path={paths.signup} element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
>>>>>>> main
  )
}
