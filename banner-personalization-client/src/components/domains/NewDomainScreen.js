import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { addDomain } from '../../api/apiCalls';

import { Button, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ColorPicker, createColor } from 'material-ui-color';
import { usePickerColor } from '../../hooks/usePickerColor';

const defaultColors = {
    bckColor: 'fff',
    primaryColor: '7c3aed',
    fontColor: '000'
}

export const NewDomainScreen = () => {
    const navigate = useNavigate()
    const [formValues, handleInputChange] = useForm({
        domain: ''
    })

    const [ colorValues, handleColorChange ] = usePickerColor({
        bckColor: createColor('#'+defaultColors.bckColor),
        primaryColor: createColor('#'+defaultColors.primaryColor),
        fontColor: createColor('#'+defaultColors.fontColor)
    })

    const {bckColor, primaryColor, fontColor} = colorValues

    const { domain } = formValues

    const handleBack = () => {
        return navigate('/')
    }

    const handleAddDomain = async () => {
        try {
            const response = await addDomain({domain, bckColor: `#${bckColor.hex || defaultColors.bckColor}`, primaryColor: `#${primaryColor.hex || defaultColors.primaryColor}`, fontColor: `#${fontColor.hex || defaultColors.fontColor}`})
            const { domainId } = response
            return navigate('/domain/'+domainId)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <div style={{margin: 20}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Tooltip title="Go back">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={() => handleBack()}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    </Tooltip>
                <Typography variant="h6" component="h4" style={{marginLeft: 20}}>Add new domain</Typography>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{marginTop: 20, marginBottom: 20, maxWidth: 500}}>
                    <TextField 
                        label="Domain" 
                        variant="outlined" 
                        fullWidth 
                        required 
                        name='domain'
                        value={domain}
                        onChange={handleInputChange}
                        helperText={null}
                        error={false}
                        style={{marginBottom: 20}}
                    />
                    <div>
                        <Typography style={{fontSize: 19, color: '#6b7280', marginBottom: 10}}>Banner customization</Typography>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            <div style={{marginBottom: 15}}>
                                <Typography style={{fontSize: 15}}>Background color:</Typography>
                                <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>
                                <TextField 
                                    variant="outlined" 
                                    size='small'
                                    style={{maxWidth: 100}}
                                    disabled
                                    value={`#${bckColor.hex || defaultColors.bckColor}`}
                                />
                                <ColorPicker value={bckColor} onChange={(value) => handleColorChange(value, 'bckColor')} hideTextfield/>
                                </div>
                            </div>

                            <div style={{marginBottom: 15}}>
                                <Typography style={{fontSize: 15}}>Primary color:</Typography>
                                <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>
                                <TextField 
                                    variant="outlined" 
                                    size='small'
                                    style={{maxWidth: 100}}
                                    disabled
                                    value={`#${primaryColor.hex || defaultColors.primaryColor}`}
                                />
                                <ColorPicker value={primaryColor} onChange={(value) => handleColorChange(value, 'primaryColor')} hideTextfield/>
                                </div>
                            </div>

                            <div style={{marginBottom: 15}}>
                                <Typography style={{fontSize: 15}}>Font color:</Typography>
                                <div style={{display: 'flex', alignItems: 'center', marginRight: 10}}>
                                <TextField 
                                    variant="outlined" 
                                    size='small'
                                    style={{maxWidth: 100}}
                                    disabled
                                    value={`#${fontColor.hex || defaultColors.fontColor}`}
                                />
                                <ColorPicker value={fontColor} onChange={(value) => handleColorChange(value, 'fontColor')} hideTextfield/>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <Button 
                        variant="contained" 
                        fullWidth
                        style={{background: '#7c3aed', maxWidth: 500, marginTop: 20}}
                        onClick={() => {handleAddDomain()}}
                    >
                        <Typography style={{fontSize: 14}}>
                            Add domain
                        </Typography>
                    </Button>
                </div>
               
            </div>
            <div>

            </div>
        </div>
    )
}
