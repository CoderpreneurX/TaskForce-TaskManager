import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NoteDetailWidget from '../components/NoteDetailWidget'
import { useParams } from 'react-router-dom'
import { retrieveNote } from '../utils/notes'
import PageNavBar from '../components/PageNavBar'

export default function NoteDetailView() {
  const [isLoading, setIsLoading] = useState(true)
  const [note, setNote] = useState({})
  const { id } = useParams()

  useEffect(() => {
    retrieveNote(id).then((note) => {
      setNote(note)
      setIsLoading(false)
    })
  }, [])
  return (
    <section className='h-screen bg-secondary px-4 flex flex-col'>
      <Header />
      {!isLoading && (
        <>
          <PageNavBar />
          <div className='flex-1 bg-secondary'>
            <NoteDetailWidget note={note} />
          </div>
        </>
      )}
    </section>
  )
}
