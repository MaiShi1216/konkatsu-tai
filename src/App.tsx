import React from 'react'
import { Sample } from '@/components/sample/Sample'
import { Chat } from '@/components/chat/Chat'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { paths } from '@/utils/paths'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.sample} element={<Sample />} />
      </Routes>
    </BrowserRouter>
    );
  return (
    <BrowserRouter>
      <Routes>
        <Route path={paths.chat} element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}
