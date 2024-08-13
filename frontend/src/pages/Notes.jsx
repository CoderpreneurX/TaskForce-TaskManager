import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NotesList from '../components/NotesList'
import { FaSearch } from 'react-icons/fa'
import { getNotesList } from '../utils/notes'
import LoadingDiv from '../components/LoadingDiv'

export default function Notes() {
    const [isLoading, setIsLoading] = useState(true)
    const [notes, setNotes] = useState([])

    useEffect(() => {
        getNotesList().then((data) => {
            setNotes(data)
            setIsLoading(false)
        })
    }, [])
    return (
        <section className='flex min-h-screen max-w-screen-md md:mx-auto flex-col'>
            <Header />
            <div className='flex-1 p-4 md:px-0'>
                <div className='flex gap-2'>
                    <input placeholder='Search Notes...' type="text" className='inp-primary' />
                    <button className='flex-1 btn-primary'>
                        <FaSearch />
                    </button>
                </div>
                {isLoading ? (
                    <div className='self-center justify-self-center'>
                        <LoadingDiv />
                    </div>
                ) : notes.length === 0 ? (
                    <p className="text-lg font-medium">You don't have any notes!</p>
                ) : (
                    <NotesList notes={notes} />
                )}
            </div>
            <Footer />
        </section>
    )
}
