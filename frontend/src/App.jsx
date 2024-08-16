import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './components/ProtectedRoute'
import CreateTask from './pages/CreateTask'
import AddMembersForm from './components/AddMembersForm'
import ViewTask from './pages/ViewTask'
import Homepage from './pages/Homepage'
import EditTask from './pages/EditTask'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        } />
        <Route path='/login/' element={<LoginPage />} />
        <Route path='/create-task/' element={
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        } />
        <Route path='/view-task/:taskId/' element={
          <ProtectedRoute>
            <ViewTask />
          </ProtectedRoute>
        } />
        <Route path='/edit-task/:taskId/' element={
          <ProtectedRoute>
            <EditTask />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}
