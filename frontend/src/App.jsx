import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import LoginPage from './pages/LoginPage'
import NoteDetailView from './pages/NoteDetailView'
import CreateNote from './pages/CreateNote'
import UpdateNote from './pages/UpdateNote'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Notes />
          </ProtectedRoute>
        } />
        <Route path='/login/' element={<LoginPage />} />
        <Route path='/view-note/:id/' element={
          <ProtectedRoute>
            <NoteDetailView />
          </ProtectedRoute>
        } />
        <Route path='/create-note/' element={
          <ProtectedRoute>
            <CreateNote />
          </ProtectedRoute>
        } />
        <Route path='/update-note/:id/' element={
          <ProtectedRoute>
            <UpdateNote />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
