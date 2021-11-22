import React from 'react'
import { Typography } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';

export const Logo = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <LockIcon style={{color: '#7c3aed', fontSize: 55}}/>
                <Typography variant="h2" component='h1'  style={{fontWeight: '900',color: '#7c3aed', marginTop: 4}}>
                    CMP
                </Typography>
            </div>
            <Typography variant="h6" component='h2' style={{color: '#6b7280', fontSize: 14}}>
                Wibson Cookie Management Platform Challenge
            </Typography>
        </div>
    )
}
