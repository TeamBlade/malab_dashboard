import React, { useEffect } from 'react'
import { getUserState } from '../state/user'
export default function Home(props) {
    const user = getUserState()
    useEffect(() => {
        window.location.assign(`http://localhost:3001/${user}`)
    }, [])

    return <div></div>
}