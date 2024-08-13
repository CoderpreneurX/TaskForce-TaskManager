import React, { useRef, useState } from 'react'

export default function LoginForm({ onSubmit }) {
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)

    const usernameRef = useRef(null)
    const passwordRef = useRef(null)
    const loginBtnRef = useRef(null)

    function handleFormSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append('username', usernameRef.current.value)
        formData.append('password', passwordRef.current.value)

        onSubmit(formData)
    }
    return (
        <>
            <form className='form-primary' onSubmit={handleFormSubmit}>
                <h1 className="form-title">Login</h1>
                <p>Enter your credentials to continue</p>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        name="login-username"
                        id="login-username"
                        ref={usernameRef} 
                        required />
                    <input
                        type="password"
                        name="login-password"
                        id="login-password"
                        ref={passwordRef} 
                        required />
                    <button
                        type='submit'
                        className="btn-primary"
                        ref={loginBtnRef}>
                        Login
                    </button>
                </div>
            </form>
        </>
    )
}
