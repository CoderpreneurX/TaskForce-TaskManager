import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { client } from '../utils/api'
import TaskComment from '../components/TaskComment'
import { FaPencil, FaTrash } from 'react-icons/fa6'

export default function ViewTask() {
    const { taskId } = useParams()

    const [task, setTask] = useState(null)
    const [taskCreatedDate, setTaskCreatedDate] = useState('')
    const [taskDueDate, setTaskDueDate] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [comments, setComments] = useState(null)
    const [isMembersPopupActive, setIsMembersPopupActive] = useState(false)

    const commentRef = useRef(null)
    const postCommentBtn = useRef(null)

    const navigate = useNavigate()

    useEffect(() => {
        client.get(`taskforce/retrieve-update-delete-task/${taskId}/`).then((response) => {
            console.log(response.data)
            setTask(response.data)
            setComments(response.data.comments)

            if (response.data.created_at === response.data.updated_at) {
                setTaskCreatedDate(`Created: ${formatDate(response.data.updated_at)}`)
            } else {
                setTaskCreatedDate(`Updated at: ${formatDate(response.data.updated_at)}`)
            }

            setTaskDueDate(`Due date: ${formatDate(response.data.due_date)}`)

            setIsLoading(false)
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    function formatDate(dateString) {
        const splitDate = dateString.split('T')
        const date = splitDate[0]
        const time = splitDate[1].split(':')
        time.pop(2)
        return `${date} ${time[0]}:${time[1]} Hrs`
    }

    function handleDeleteTask() {
        if (confirm('Sure to delete task?')) {
            client.delete(`taskforce/retrieve-update-delete-task/${taskId}/`).then((response) => {
                console.log(response)
                navigate('/')
            })
        }
    }

    function toggleViewMembers() {
        isMembersPopupActive ? setIsMembersPopupActive(false) : setIsMembersPopupActive(true)
    }

    function handlePostComment(e) {
        e.preventDefault()

        client.post(
            `taskforce/list-create-task-comments/${taskId}/`,
            { content: commentRef.current.value }
        ).then((response) => {
            console.log(response.data)
            setComments([response.data, ...comments])
        }).catch((error) => {
            console.error(error)
        })

        commentRef.current.value = ''
    }

    return (
        <main className='bg-secondary'>
            {isLoading ? (
                <div>Loading</div>
            ) : (
                <section className='min-h-screen flex flex-col gap-2 max-w-screen-md mx-auto p-4'>
                    <h1 className="text-xl font-bold text-center">View Task</h1>
                    <h1 className='text-2xl font-bold'>{task.title}</h1>
                    <div className="border-y-2 border-black p-2 font-medium relative">
                        <p>{taskCreatedDate}</p>
                        <p>{taskDueDate}</p>
                        <div className='flex gap-2 justify-between'>
                            <button onClick={toggleViewMembers} className='btn-primary'>View Members</button>
                            <div className="flex gap-2">
                                <button onClick={() => {navigate(`/edit-task/${taskId}/`)}} className="btn-primary"><FaPencil /></button>
                                <button onClick={handleDeleteTask} className="btn-primary"><FaTrash /></button>
                            </div>
                        </div>
                        {isMembersPopupActive && (
                            <div className="border-2 border-b-4 my-4 absolute bg-secondary w-full max-w-xs border-black p-2 rounded">
                                {task.assigned_members.length === 0 ? (
                                    <p className='text-lg font-medium my-2'>No members assigned!</p>
                                ) : task.assigned_members.map((member, index) => (
                                    <div className='font-medium border-b-2 border-black mb-2' key={index}>
                                        <p className='text-lg'>{member.first_name} {member.last_name}</p>
                                        <p>@{member.username}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className='flex-1 relative'>
                        <p className="font-medium break-words text-justify">{task.description}</p>
                    </div>
                    <div className='mt-4 border-t-2 border-black'>
                        <h1 className="text-xl font-bold mb-2">Comments</h1>
                        <ul>
                            {comments.length === 0 ? (
                                <p className='font-medium text-center my-12'>No comments yet!</p>
                            ) :
                                comments.map((commentContent, index) => (
                                    <li className='mb-2' key={index}>
                                        <TaskComment comment={commentContent} />
                                    </li>
                                ))
                            }
                        </ul>
                        <form onSubmit={handlePostComment} className='flex gap-2 py-2'>
                            <input ref={commentRef} placeholder='Type something...' className='bg-secondary border-2 w-full border-b-4 border-black px-4 py-2 rounded' required type="text" name="comment-text" id="comment-text" />
                            <button ref={postCommentBtn} type='submit' className="btn-primary">Post</button>
                        </form>
                    </div>
                </section>
            )}
        </main>
    )
}
