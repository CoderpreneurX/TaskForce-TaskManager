import React from 'react'
import { FaAngleLeft } from 'react-icons/fa6'
import {useNavigate} from 'react-router-dom'

export default function PageNavBar() {
    const navigate = useNavigate()
    return (
        <div className='px-4 md:px-0 pt-2 bg-secondary'>
            <button onClick={() => {navigate(-1)}} className='flex items-center hover:underline'>
                <FaAngleLeft fontSize={'large'} />
                <h3 className="font-medium text-lg">Back</h3>
            </button>
        </div>
    )
}
