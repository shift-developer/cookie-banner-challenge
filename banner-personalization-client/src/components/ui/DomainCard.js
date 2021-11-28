import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Card, CardActions, CardContent, Chip, IconButton, Tooltip, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDomainById } from '../../api/apiCalls';

export const DomainCard = ({domainDetails, deleteDomainInState}) => {
    const navigate = useNavigate()
    const handleEdit = (domainId) => {
        return navigate('/domain/' + domainId)
    }

    const handleDelete = async (domainId) => {
        try {
            const res = await deleteDomainById({domainId})
            deleteDomainInState(domainId)
        } catch (e) {
        }
    }
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
                    {domainDetails.domain}
                </Typography>
            
            </CardContent>
            <CardActions>
                <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(domainDetails._id)}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={() => {handleDelete(domainDetails._id)}}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}
