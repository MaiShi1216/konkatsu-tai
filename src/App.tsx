import React from 'react'
import { Sample } from '@/components/sample/Sample'
import { Home } from '@/components/home/Home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { paths } from '@/utils/paths'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.sample} element={<Sample />} />
        <Route path={paths.home} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
