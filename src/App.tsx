import React from 'react'
import { Sample } from '@/components/sample/Sample'
import { Matched } from '@/components/Matched'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { paths } from '@/utils/paths'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.sample} element={<Sample />} />
        <Route path={paths.matched} element={<Matched />} />
      </Routes>
    </BrowserRouter>
  )
}
