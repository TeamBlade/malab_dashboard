import React, { useEffect } from 'react'

export default function Home(props) {

    useEffect(() => {
        window.location.assign('http://localhost:3001')
    }, [])

    return <div></div>
}