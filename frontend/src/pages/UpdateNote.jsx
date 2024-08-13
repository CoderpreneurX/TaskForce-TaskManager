import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CreateUpdateNoteForm from '../components/CreateUpdateNoteForm'
import { updateNote, retrieveNote } from '../utils/notes'
import { useParams, useNavigate } from 'react-router-dom'
import PageNavBar from '../components/PageNavBar'
import MessageAlert from '../components/MessageAlert'

export default function UpdateNote() {
  const [note, setNote] = useState({})
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const navigate = useNavigate()
  const {id} = useParams()

  function handleUpdateNote(data) {
    updateNote(data, id).then((response) => {
      setMessage(response.message)
      setMessageType(response.type)
      setTimeout(() => {
        setMessage(null)
        navigate(-1)
      }, 3000);
    }).catch((error) => {
      setMessage(error.message)
      setMessageType(error.type)
    })
  }

  useEffect(() => {
    retrieveNote(id).then((note) => {
      setNote(note)
    })
  }, [])
  return (
    <section className="h-screen bg-secondary flex flex-col">
      {message && (
        <MessageAlert content={message} type={messageType} onDismiss={() => {setMessage(null)}} />
      )}
      <Header />
      <PageNavBar />
      <div className="flex-1 p-4">
        <CreateUpdateNoteForm onSubmit={(data) => { handleUpdateNote(data) }} action='update' note={note} />
      </div>
    </section>
  )
}
