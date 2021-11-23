import React from 'react'
import { Card, CardActions, CardContent, Chip, IconButton, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';

export const DomainCard = ({domainDetails}) => {
    return (
        <Card sx={{ minWidth: 275, marginBottom: 2 }} variant="outlined">
            <CardContent>
                <div style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                    <Chip label="active" style={{background: '#10b981', color: '#fff', fontSize: 12}}/>
                    <Typography sx={{ fontSize: 14, marginLeft: 2 }} color="text.secondary" gutterBottom>
                    Free Plan
                    </Typography>
                </div>
                <Typography variant="h5" component="div" style={{marginLeft: 5}}>
                    {domainDetails}
                </Typography>
            
            </CardContent>
            <CardActions>
                <Tooltip title="Edit">
                    <IconButton aria-label="add to favorites">
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton aria-label="add to favorites">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}
