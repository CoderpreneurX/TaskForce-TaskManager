import React from 'react'
import CreateUpdateTaskForm from '../components/CreateUpdateTaskForm'
import {client} from '../utils/api'

export default function CreateTask() {
  function handleFormSubmit(formData) {
    client.post('taskforce/create-task/', formData).then((response) => {
      console.log(response)
    }).catch((error) => {
      console.error(error.response)
    })
  }

  return (
    <>
      <CreateUpdateTaskForm onSubmit={(fd) => {handleFormSubmit(fd)}} />
    </>
  )
}
