import React from 'react'
import CreateUpdateTaskForm from '../components/CreateUpdateTaskForm'
import {client} from '../utils/api'
import { useNavigate } from 'react-router-dom'

export default function CreateTask() {
  const navigate = useNavigate()
  function handleFormSubmit(formData) {
    client.post('taskforce/create-task/', formData).then((response) => {
      console.log(response)
      confirm('Task added successfully!')
      navigate('/')
    }).catch((error) => {
      console.error(error.response)
    })
  }

  return (
    <section className='min-h-screen p-4 flex'>
      <CreateUpdateTaskForm onSubmit={(fd) => {handleFormSubmit(fd)}} />
    </section>
  )
}
