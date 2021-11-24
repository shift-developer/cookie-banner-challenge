import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePickerColor } from '../../hooks/usePickerColor'
import { ColorPicker, createColor } from 'material-ui-color'
import { editDomainById, getDomainById } from '../../api/apiCalls'

import { Button, IconButton, TextField, Tooltip, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const defaultColors = {
    bckColor: 'fff',
    primaryColor: '7c3aed',
    fontColor: '000'
}

export const DomainScreen = () => {
    const navigate = useNavigate()
    const { domainId } = useParams()
    const [{loading, domainData}, setDomainData] = useState({loading: true, domainData: {}})

    const [ colorValues, handleColorChange ] = usePickerColor({
        bckColor: createColor('#'+defaultColors.bckColor),
        primaryColor: createColor('#'+defaultColors.primaryColor),
        fontColor: createColor('#'+defaultColors.fontColor)
    })

    const {bckColor, primaryColor, fontColor} = colorValues

    const handleDataFetch = useCallback(
        () => {
            console.log('se vuelve a ingresar')
            getDomainById(domainId)
            .then(data => {
                console.log(data.data.bckColor)
                handleColorChange(createColor(data.data.bckColor), 'bckColor')
                handleColorChange(createColor(data.data.primaryColor), 'primaryColor')
                handleColorChange(createColor(data.data.fontColor), 'fontColor')
                setDomainData({domainData: data.data, loading: false})
            })
            .catch(e => {
                return navigate('/')
            })
        },
        [domainId, handleColorChange, navigate]
    )

    useEffect(() => {
        handleDataFetch()
    }, [])

    const handleBack = () => {
        return navigate('/')
    }

    const handleEditDomain = async () => {
        try {
            const response = await editDomainById({domainId, domainData: {bckColor: `#${bckColor.hex || domainData.bckColor}`, primaryColor: `#${primaryColor.hex || domainData.primaryColor}`, fontColor: `#${fontColor.hex || domainData.fontColor}`, domain: domainData.domain}})
            console.log(`response`, response)
            return navigate('/')
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
                <Typography variant="h6" component="h4" style={{marginLeft: 20}}>Edit domain</Typography>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{marginTop: 20, marginBottom: 20, maxWidth: 500}}>
                    <Typography variant="h6" component="h6" style={{fontSize: 36}}>{domainData.domain}</Typography>
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
                        onClick={() => {handleEditDomain()}}
                    >
                        <Typography style={{fontSize: 14}}>
                            Save changes
                        </Typography>
                    </Button>
                </div>
               
            </div>
            <div>

            </div>
        </div>
    )
}
