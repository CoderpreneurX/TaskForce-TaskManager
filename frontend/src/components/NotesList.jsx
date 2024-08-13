import React from 'react'
import Note from './Note'

export default function NotesList({notes}) {
  return (
    <div>
        {notes.map((note) => (
            <Note 
                key={note.id}
                id={note.id}
                title={note.title}
                content={note.content}
                date={note.created_at}
            />
        ))}
    </div>
  )
}
