import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function LoginForm({ onSubmit=()=>{} }) {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    function handleFormSubmit(e) {
        e.preventDefault()

        const formData = new FormData()
        formData.append('username', usernameRef.current.value)
        formData.append('password', passwordRef.current.value)

        onSubmit(formData)
    }

    return (
        <div className='bg-secondary rounded border-2 border-b-[5px] text-center border-black p-4'>
            <h1 className='font-bold text-2xl'>Login</h1>
            <p className="font-medium">Enter your credentials to continue</p>
            <form onSubmit={handleFormSubmit} className='my-3'>
                <div className='grid mb-2'>
                    <input ref={usernameRef} required className='inp-primary' placeholder='username' type="text" name="login_username" id="login_username" />
                    <input ref={passwordRef} required className='inp-primary' placeholder='***********' type="password" name="login_password" id="login_password" />
                </div>
                <button className="btn-primary">Login</button>
                <p className='font-medium'>Don't have an account? <Link className='text-blue-800 hover:underline' to={'/register/'}>Register</Link></p>
            </form>
        </div>
    )
}
