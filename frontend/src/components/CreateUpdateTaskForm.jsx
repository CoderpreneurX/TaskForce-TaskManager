import React, { useRef, useState } from 'react'
import AddMembersForm from './AddMembersForm'

export default function CreateUpdateTaskForm({ mode = 'create', onSubmit }) {
  const [isAddMembersModalActive, setIsAddMembersModalActive] = useState(true)
  const [selectedMembers, setSelectedMembers] = useState([])
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const dateRef = useRef(null)

  function handleFormSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', titleRef.current.value)
    formData.append('description', descriptionRef.current.value)
    formData.append('due_date', dateRef.current.value)

    selectedMembers.forEach((memberId) => {
      formData.append('assigned_members', memberId)
    })

    onSubmit(formData)
    // console.log(selectedMembers)
  }
  return (
    <>
      {isAddMembersModalActive && (
        <div className="z-10 bg-black bg-opacity-60 h-screen fixed top-0 left-0">
          <AddMembersForm onSubmit={(membersList) => {setSelectedMembers(membersList)}} />
        </div>
      )}
      <form onSubmit={handleFormSubmit}>
        <h1 className="form-title">{mode === 'create' ? 'Create' : 'Update'} Task</h1>
        <div className="flex flex-col gap-2">
          <input ref={titleRef} type="text" name="task-title" id="task-title" />
          <input ref={dateRef} type="datetime-local" name="task-due-date" id="task-due-date" />
        </div>
        <textarea ref={descriptionRef} name="task-content" id="task-content"></textarea>
        <button type='submit'>{mode === 'create' ? 'Create' : 'Update'} Task</button>
      </form>
    </>
  )
}
