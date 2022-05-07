import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
export default function logout(props) {
    useEffect(() => {
        localStorage.clear()
    }, [])
    return (
        <Redirect to='/login' />
    )
}