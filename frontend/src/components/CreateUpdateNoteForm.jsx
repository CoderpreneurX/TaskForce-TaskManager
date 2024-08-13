import React, { useEffect, useRef, useState } from 'react'
import MessageAlert from './MessageAlert'

export default function CreateUpdateNoteForm({ onSubmit, action = 'create', note }) {
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const titleRef = useRef(null)
  const contentRef = useRef(null)
  const submitBtn = useRef(null)

  function handleFormSubmit(e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', titleRef.current.value)
    formData.append('content', contentRef.current.value)

    if (titleRef.current.value.length >= 100) {
      setMessage('Title should not exceed 100 characters!')
      setMessageType('failure')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } else {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className='flex h-full flex-col'>
      {message && (
        <MessageAlert content={message} type={messageType} />
      )}
      <input
        ref={titleRef}
        className='inp-primary font-bold text-lg'
        type="text"
        name="title"
        id="title"
        placeholder='This would be Note #?'
        required
        defaultValue={action === 'update' ? note.title : null}
      />

      <textarea
        ref={contentRef}
        className='inp-primary flex-1'
        name="content"
        id="content"
        required
        placeholder='Content goes here...'
        defaultValue={action === 'update' ? note.content : null}
      >
      </textarea>

      <button
        className='btn-primary'
        ref={submitBtn}
        type="submit">
        {action === 'create' ? 'Create' : 'Update'} Note
      </button>
    </form>
  )
}
