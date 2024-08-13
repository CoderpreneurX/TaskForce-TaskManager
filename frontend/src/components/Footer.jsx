import React from 'react'
import { FaPlus } from 'react-icons/fa6'
import {useNavigate} from 'react-router-dom'

export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className='px-4 sticky bottom-2 mx-2 border-b-4 md:mx-0 rounded border-2 border-black bg-secondary flex justify-center gap-1 font-medium items-center'>
      <button onClick={() => {navigate('/create-note/')}} className='rounded-full bg-tertiary -translate-y-4 border-2 border-b-4 p-2 border-black'>
        <FaPlus size={28} />
      </button>
    </footer>
  )
}
