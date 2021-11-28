import { Backdrop, CircularProgress, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { userDomains } from '../../api/apiCalls'
import { DomainCard } from '../ui/DomainCard'
import { NewDomainCard } from '../ui/NewDomainCard'

export const HomeScreen = () => {

    const [domains, setDomains] = useState([])
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        userDomains()
        .then(domains => {setDomains(domains);setLoading(false)})
        .catch(e => {setLoading(false)})
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
            {
                loading &&
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
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
