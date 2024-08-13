import React from 'react'
import { FaTimes } from 'react-icons/fa'

export default function MessageAlert({ content, type, onDismiss=()=>{} }) {
    return (
        <div className='fixed top-4 w-full z-10 left-0 p-4'>
            <div className={`${type === 'failure' ? 'failure' : 'success'} border-2 flex items-center gap-2 px-4 py-2 border-b-4 border-black rounded text-lg font-medium`}>
                <h3 className='flex-1'>{content}</h3>
                <FaTimes className='hover:cursor-pointer' onClick={onDismiss} />
            </div>
        </div>
    )
}
