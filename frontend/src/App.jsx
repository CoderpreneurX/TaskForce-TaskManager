import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import CreateTask from './pages/CreateTask'
import AddMembersForm from './components/AddMembersForm'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AddMembersForm />} />
        <Route path='/login/' element={<LoginPage />} />
        <Route path='/create-note/' element={
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
