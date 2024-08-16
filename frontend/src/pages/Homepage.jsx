import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { client } from '../utils/api'
import TaskListWidget from '../components/TaskListWidget'
import Footer from '../components/Footer'

export default function Homepage() {
    const [isLoading, setIsLoading] = useState(true)
    const [tasksCreatedList, setTasksCreatedList] = useState(null)
    const [tasksAssignedList, setTasksAssignedList] = useState(null)

    useEffect(() => {
        client.get('taskforce/list-tasks/').then((response) => {
            console.log(response)
            setTasksCreatedList(response.data.tasks_created)
            setTasksAssignedList(response.data.tasks_assigned)
            setIsLoading(false)
        })
    }, [])
    return (
        <>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <section className='flex flex-col min-h-screen'>
                    <Header />
                    <div className="flex-1">
                        <div className='px-4 py-2'>
                            <h1 className='font-bold text-xl mb-2'>Your Tasks</h1>
                            {tasksCreatedList.length === 0 ? (
                                <p className="text-center my-12 font-medium">No Tasks Created!</p>
                            ) : tasksCreatedList.map((task, index) => (
                                <TaskListWidget task={task} key={index} />
                            ))}
                        </div>
                        <div className='px-4 py-2'>
                            <h1 className="font-bold text-xl mb-2">Tasks assigned to you</h1>
                            {tasksAssignedList.length === 0 ? (
                                <p className="text-center my-12 font-medium">No Tasks Assigned!</p>
                            ) : tasksAssignedList.map((task, index) => (
                                <TaskListWidget task={task} key={index} />
                            ))}
                        </div>
                    </div>
                    <Footer />
                </section>
            )}
        </>
    )
}
