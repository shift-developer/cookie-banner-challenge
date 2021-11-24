import React from 'react'
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

export const NewDomainCard = () => {
    const navigate = useNavigate()
    const handleAddDomain = () => {
        return navigate('/new')
    }
    return (
        <Card sx={{ minWidth: 275, marginBottom: 2 }} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h5" style={{fontSize: 20}}>
                    Free plan, add your domain, customize your banner and enjoy
                </Typography>
               
            </CardContent>
            <CardActions>
            <Button 
                variant="contained" 
                style={{background: '#7c3aed', marginLeft: 10, marginBottom: 10}}
                onClick={() => handleAddDomain()}
            >
                <AddIcon style={{fontSize: 14, marginRight: 5}}/>
                <Typography style={{fontSize: 14}}>
                    Domain
                </Typography>
            </Button>
            </CardActions>
        </Card>
    )
}
