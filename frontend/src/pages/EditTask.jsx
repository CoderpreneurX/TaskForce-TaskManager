import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { client } from '../utils/api'
import CreateUpdateTaskForm from '../components/CreateUpdateTaskForm'
import LoadingDiv from '../components/LoadingDiv'

export default function EditTask() {
    const {taskId} = useParams()

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(true)
    const [task, setTask] = useState(null)

    useEffect(() => {
        client.get(`taskforce/retrieve-update-delete-task/${taskId}/`).then((response) => {
            console.log(response)
            setTask(response.data)
            setIsLoading(false)
        })
    }, [])

    function handleFormSubmit(formData) {
        console.log(formData.get('due_date'))
        client.patch(`taskforce/retrieve-update-delete-task/${taskId}/`, formData).then((response) => {
            console.log(response)
            navigate(`/view-task/${taskId}/`)
        })
    }

  return (
    <section className='flex min-h-screen p-4'>
        {isLoading ? (
            <LoadingDiv />
        ) : (
            <CreateUpdateTaskForm mode='update' task={task} onSubmit={handleFormSubmit}/>
        )}
    </section>
  )
}
