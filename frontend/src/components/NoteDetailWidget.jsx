import React, { useState } from 'react'
import { FaPencil, FaTrash } from 'react-icons/fa6'
import { deleteNote } from '../utils/notes'
import { useNavigate } from 'react-router-dom'
import MessageAlert from './MessageAlert'

export default function NoteDetailWidget({ note }) {
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const formattedDate = new Date(note.created_at).toISOString().split('T')[0]
  const navigate = useNavigate()

  function handleDeleteNote() {
    if (confirm('Sure to delete the note?')) {
      deleteNote(note.id).then((response) => {
        setMessage(response.message)
        setMessageType(response.type)
        setTimeout(() => {
          setMessage(null)
          navigate('/')
        }, 3000);
      }).catch((error) => {
        setMessage(error.message)
        setMessageType(error.type)
      })
    }
  }

  return (
    <div>
      {message && (
        <MessageAlert content={message} type={messageType} onDismiss={() => {setMessage(null)}} />
      )}
      <h1 className="font-bold text-2xl">{note.title}</h1>
      <div className='my-2 border-y-2 border-black flex gap-2'>
        <p className='font-medium flex-1 text-sm my-1 py-1 items-center'>Created: {formattedDate}</p>
        <div className='flex gap-2 items-center'>
          <button onClick={() => {navigate(`/update-note/${note.id}/`)}} className='border-2 bg-tertiary p-1 rounded border-black border-b-4'><FaPencil /></button>
          <button onClick={handleDeleteNote} className='border-2 bg-tertiary p-1 rounded border-black border-b-4'><FaTrash /></button>
        </div>
      </div>
      <p className='text-justify'>{note.content}</p>
    </div>
  )
}
