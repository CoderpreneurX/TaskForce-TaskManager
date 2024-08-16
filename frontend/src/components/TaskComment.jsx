import React from 'react'

export default function TaskComment({comment}) {
  return (
    <div className='border-2 font-medium border-black border-b-4 bg-secondary p-2 rounded'>
      <p className="text-lg">@{comment.user.username}</p>
      <p>{comment.content}</p>
    </div>
  )
}
