import React from 'react'
import { Link } from 'react-router-dom'

export default function Note({ title, content, date, id }) {
    const formattedDate = new Date(date).toISOString().split('T')[0]
    return (
        <div className='mb-4 p-2 border-2 bg-secondary border-black border-b-[5px] rounded-md'>
            <Link className='hover:underline' to={`/view-note/${id}/`}><h1 className="mb-2 font-bold text-xl">{title}</h1></Link>
            <p className="line-clamp-3 text-justify">{content}</p>
            <p className="text-right my-1 text-sm font-medium">{formattedDate}</p>
        </div>
    )
}
