import React, { useState } from 'react'
import Header from '../components/Header'
import CreateUpdateNoteForm from '../components/CreateUpdateNoteForm'
import { createNote } from '../utils/notes'
import PageNavBar from '../components/PageNavBar'
import MessageAlert from '../components/MessageAlert'
import { useNavigate } from 'react-router-dom'

export default function CreateNote() {
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const navigate = useNavigate()

  function handleCreateNote(data) {
    createNote(data).then((response) => {
      console.log(response)
      setMessage(response.message)
      setMessageType(response.type)
      setTimeout(() => {
        setMessage(null)
        navigate('/')
      }, 3000)
    }).catch((error) => {
      console.log(error)
      setMessage(error.message),
      setMessageType(error.type)
    })
  }
  return (
    <section className="h-screen bg-secondary flex flex-col">
      {message && (
        <MessageAlert content={message} type={messageType} onDismiss={() => {setMessage(null)}} />
      )}
      <Header />
      <PageNavBar />
      <div className="flex-1 p-4">
        <CreateUpdateNoteForm onSubmit={(data) => { handleCreateNote(data) }} />
      </div>
    </section>
  )
}
