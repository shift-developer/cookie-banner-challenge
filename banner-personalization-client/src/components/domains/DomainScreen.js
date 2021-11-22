import React from 'react'
import { useParams, Navigate } from 'react-router-dom'

export const DomainScreen = () => {
    const { domainId } = useParams()

    const domain = domainId // TO DO FETCH TO DOMAIN ID GET
    if (!domain) {
        return <Navigate to='/' />
    }
    return (
        <div>
            <h1>{domain}</h1>
        </div>
    )
}
