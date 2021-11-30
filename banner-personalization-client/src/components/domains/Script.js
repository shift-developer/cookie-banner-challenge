import { Alert, Button, Card, CardContent, Snackbar, Typography } from '@mui/material'
import React from 'react'

export const Script = ({domainId}) => {

    const [open, setOpen] = React.useState(false);

    const scriptHtmlText = `<script defer domain-id="${domainId}" src="${window.location.origin}/widget/banner.js"></script>`
    
    const handleClose = (event, reason) => {
        setOpen(false)
    }

    const handleCopyToClipboard = (event, reason) => {
        navigator.clipboard.writeText(scriptHtmlText)
        setOpen(true)
    }


    return (
        <Card sx={{ minWidth: 275, marginBottom: 2, maxWidth: 900 }} variant="outlined">
            <CardContent style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography style={{fontSize: 13, marginRight: 20, color: '#6b7280'}}>
                    {scriptHtmlText}
                </Typography>
                <Button 
                    variant="contained" 
                    style={{background: '#7c3aed', flex: 1}}
                    onClick={() => handleCopyToClipboard()}
                >
                    <Typography style={{fontSize: 12}}>
                        Copy to clipboard
                    </Typography>
                </Button>
                <Snackbar
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                    open={open}
                    autoHideDuration={1000}
                    onClose={handleClose}
                >
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Script copied!
                    </Alert>
                </Snackbar>
            </CardContent>
        </Card>
    )
}
