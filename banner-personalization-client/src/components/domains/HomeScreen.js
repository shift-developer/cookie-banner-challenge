import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { userDomains } from '../../api/apiCalls'
import { DomainCard } from '../ui/DomainCard'
import { NewDomainCard } from '../ui/NewDomainCard'

export const HomeScreen = () => {

    const [domains, setDomains] = useState([])
    
    useEffect(() => {
        userDomains()
        .then(domains => {setDomains(domains)})
        .catch(e => console.log(`e`, e))
    }, [])

    const deleteDomainInState = (domainID) => {
        const _domains = [...domains]
        const idx = domains.findIndex(item => item._id === domainID)
        _domains.splice(idx,1)
        setDomains(_domains)
    }

    return (
        <div style={{margin: 20}}>
            <div>
                <Typography variant="h5" component="h2">Your domains</Typography>
                <Typography style={{fontSize: 16, color: '#6b7280'}}>Manage your cookie banners</Typography>
            </div>
            <div style={{marginTop: 20}}>
                <NewDomainCard/>
                {
                    domains.map((domain) => (
                        <DomainCard key={domain._id} domainDetails={domain} deleteDomainInState={deleteDomainInState}/>
                    ))
                }
            </div>
        </div>
    )
}
