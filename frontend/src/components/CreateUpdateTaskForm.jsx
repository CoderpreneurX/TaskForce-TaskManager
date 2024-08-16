import React, { useRef, useState } from 'react'
import AddMembersForm from './AddMembersForm'

export default function CreateUpdateTaskForm({ mode = 'create', task = null, onSubmit }) {
  const [isAddMembersModalActive, setIsAddMembersModalActive] = useState(false)
  const [selectedMembers, setSelectedMembers] = useState([])
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const dateRef = useRef(null)

  function handleFormSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', titleRef.current.value)
    formData.append('description', descriptionRef.current.value)

    selectedMembers.forEach((memberId) => {
      formData.append('assigned_members', memberId)
    })

    if (dateRef.current.value === '') {
      formData.append('due_date', task.due_date)
    } else {
      formData.append('due_date', dateRef.current.value)
    }
    
    onSubmit(formData)
  }

  function addMembers(list) {
    setSelectedMembers(list)
    setIsAddMembersModalActive(false)
  }

  return (
    <>
      {isAddMembersModalActive && (
        <div className="z-10 bg-black bg-opacity-60 h-screen grid place-items-center w-full fixed top-0 left-0">
          <AddMembersForm members={selectedMembers} onSubmit={(membersList) => { addMembers(membersList) }} />
        </div>
      )}
      <form className='flex max-w-screen-md mx-auto flex-col gap-2 flex-1' onSubmit={handleFormSubmit}>
        <h1 className="form-title text-center font-bold text-2xl">{mode === 'create' ? 'Create' : 'Update'} Task</h1>
        <input
          placeholder='Task Title'
          defaultValue={task ? task.title : null}
          required className='px-4 py-2 border-2 border-b-4 rounded border-black bg-secondary'
          ref={titleRef}
          type="text"
          name="task-title"
          id="task-title" />
        <div className='flex gap-2 flex-col sm:flex-row'>
          <input
            defaultValue={task ? task.due_date : null}
            required={task ? false : true}
            className='px-4 flex-1 py-2 border-2 border-b-4 rounded border-black bg-secondary'
            ref={dateRef}
            type="datetime-local"
            name="task-due-date"
            id="task-due-date" />
          <button className="btn-primary flex-1" onClick={(e) => { e.preventDefault(); setIsAddMembersModalActive(true) }}>Add Members</button>
        </div>
        <textarea
          defaultValue={task ? task.description : null}
          placeholder='Describe the task...'
          required
          className='px-4 flex-1 py-2 border-2 border-b-4 rounded border-black bg-secondary'
          ref={descriptionRef}
          name="task-content"
          id="task-content"></textarea>
        <button
          className='btn-primary'
          type='submit'>
          {mode === 'create' ? 'Create Task' : 'Update Task'}
        </button>
      </form>
    </>
  )
}
