import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { usePickerColor } from '../../hooks/usePickerColor'
import { ColorPicker, createColor } from 'material-ui-color'
import { editDomainById, getDomainById } from '../../api/apiCalls'

import { Alert, Button, CircularProgress, IconButton, Skeleton, TextField, Tooltip, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Script } from './Script'

const defaultColors = {
    bckColor: 'fff',
    primaryColor: '7c3aed',
    fontColor: '000'
}

export const DomainScreen = () => {
    const navigate = useNavigate()
    const { domainId } = useParams()
    const [{loading, domainData}, setDomainData] = useState({loading: true, domainData: {}})
    const [{loadingEdit, errorEdit}, setLoadingEdit] = useState({loadingEdit: false, errorEdit: null})

    const [ colorValues, handleColorChange,,setColorValues ] = usePickerColor({
        bckColor: createColor('#'+defaultColors.bckColor),
        primaryColor: createColor('#'+defaultColors.primaryColor),
        fontColor: createColor('#'+defaultColors.fontColor)
    })

    const {bckColor, primaryColor, fontColor} = colorValues

    const handleDataFetch = useCallback(
        () => {
            getDomainById(domainId)
            .then(data => {
                setColorValues(prev => ({...prev, bckColor: createColor(data.data.bckColor), primaryColor: createColor(data.data.primaryColor), fontColor: createColor(data.data.fontColor)}))
                setDomainData({domainData: data.data, loading: false})
            })
            .catch(e => {
                return navigate('/')
            })
        },
        [domainId, navigate, setColorValues]
    )

    useEffect(() => {
        handleDataFetch()
    }, [])

    const handleBack = () => {
        return navigate('/')
    }

    const handleEditDomain = async () => {
        try {
            setLoadingEdit({loadingEdit: true, errorEdit: null})
            const response = await editDomainById({domainId, domainData: {bckColor: `#${bckColor.hex || domainData.bckColor}`, primaryColor: `#${primaryColor.hex || domainData.primaryColor}`, fontColor: `#${fontColor.hex || domainData.fontColor}`, domain: domainData.domain}})
            return navigate('/')
        } catch (e) {
            setLoadingEdit({loadingEdit: false, errorEdit: e.message})
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
            {
                loading ?
                <>
                    <Skeleton variant="rectangular" width={300} height={57} style={{marginTop: 20}}/>
                    <Skeleton variant="rectangular" width={300} height={25} style={{marginTop: 20}}/>
                    <div style={{display: 'flex', flexWrap: 'wrap', width: 300, justifyContent: 'space-between', marginTop: 20}}>
                        <Skeleton variant="rectangular" width={90} height={60}/>
                        <Skeleton variant="rectangular" width={90} height={60}/>
                        <Skeleton variant="rectangular" width={90} height={60}/>
                    </div>
                </>
                :
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

                        {
                            errorEdit && <Alert severity="error" style={{marginTop: 10}}>{errorEdit}</Alert>
                        }

                        <Button 
                            variant="contained" 
                            fullWidth
                            style={{background: '#7c3aed', maxWidth: 500, marginTop: 20}}
                            onClick={() => {handleEditDomain()}}
                        >
                            {
                                loadingEdit ?
                                <CircularProgress size={14} style={{color: '#fff'}}/>
                                :
                                <Typography style={{fontSize: 14}}>
                                    Save changes
                                </Typography>
                            }
                        </Button>
                    </div>

                    <Script domainId={domainId}/>
                
                </div>

            }

        </div>
    )
}
