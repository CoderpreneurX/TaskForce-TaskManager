import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TaskListWidget({ task }) {
    function formatDate(dateString) {
        const splitDate = dateString.split('T')
        const date = splitDate[0]
        const time = splitDate[1].split(':')
        time.pop(2)
        return `${date} ${time[0]}:${time[1]} Hrs`
    }
    return (
        <div className='p-2 rounded border-2 border-black border-b-4 bg-secondary mb-2'>
            <p className="font-medium text-sm">Due on: {formatDate(task.due_date)}</p>
            <Link to={`view-task/${task.id}/`}>
                <h1 className="font-bold text-2xl">{task.title}</h1>
            </Link>
        </div>
    )
}
