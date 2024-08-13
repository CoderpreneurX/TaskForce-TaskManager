import React, { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import { isUserAuthenticated } from '../utils/auth'
import { useNavigate } from 'react-router-dom'
import LoadingDiv from '../components/LoadingDiv'
import { loginUser } from '../utils/auth'
import MessageAlert from '../components/MessageAlert'

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState(null)

    const navigate = useNavigate()

    function handleLoginUser(loginData) {
        loginUser(loginData).then((response) => {
            setMessage(response.message)
            setMessageType(response.type)
        }).catch((response) => {
            setMessage(response.message)
            setMessageType(response.type)
        })
    }

    useEffect(() => {
        setTimeout(() => {
            isUserAuthenticated().then((response) => {
                navigate('/')
            }).catch((error) => {
                setIsLoading(false)
            })
        }, 3000);
    }, [message])
    return (
        <section className='p-4 grid place-items-center h-screen'>
            {message && (
                <MessageAlert content={message} type={messageType} onDismiss={() => { setMessage(null) }} />
            )}
            {isLoading ? (
                <LoadingDiv />
            ) : (
                <LoginForm onSubmit={(loginData) => { handleLoginUser(loginData) }} />
            )}
        </section>
    )
}
