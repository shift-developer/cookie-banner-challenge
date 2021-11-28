import React, { useContext, useState } from 'react'

import { AuthContext } from '../../auth/authContext';
import { types } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';

import { Button, Container, Grid, Box, TextField, CircularProgress, Typography, Alert } from '@mui/material'
import { Logo } from './Logo';
import { register, userInfo } from '../../api/apiCalls';

export const RegisterScreen = () => {
    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: '',
        fullName: ''
    });

    const {email, password, fullName} = formValues

    const [{loading, error}, setLoading] = useState({loading: false, error: null})

      // TO DO make the loading icon charge and field validation, and manage errors

    const handleSignUp = async () => {
        try {
            setLoading({loading: true, error: null})
            const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if(emailRegex.test(email) === false) {
                throw new Error('Enter valid email')
            }
            if(password.length < 6) {
                throw new Error('Password must be at least 6 characters')
            }
            if(fullName.length < 3) {
                throw new Error('Enter your name')
            }
            const { token } = await register({email, password, fullName})
            localStorage.setItem('token', token)
            const user = await userInfo({token})
            localStorage.setItem('user',JSON.stringify({...user, logged: true}))
            const action = {
                type: types.login,
                payload: user
            }

            dispatch(action);

        } catch (e) {
            setLoading({loading: false, error: e.message})
            console.log(e)
        }

    }

    return (
        <Grid container component='main' style={{height: '100vh', alignItems: 'center'}}>
        <Container component={Box} maxWidth='xs' style={{paddingBottom: 30,padding: 15,maxHeight: '60vh', marginBottom: 40}}>
            <Logo />
            <div style={{display: 'flex', flexDirection: 'column', marginTop: 20}}>
                <form style={{marginTop: 20, marginBottom: 10}}>
                    <TextField 
                        label="Email" 
                        variant="outlined" 
                        fullWidth 
                        required 
                        name='email'
                        value={email}
                        onChange={handleInputChange}
                        helperText={null}
                        error={false}
                        style={{marginBottom: 10}}
                    />
                    <TextField 
                        label="Password"
                        variant="outlined"
                        type='password'
                        fullWidth 
                        required
                        name='password'
                        value={password}
                        onChange={handleInputChange}
                        helperText={null}
                        error={false}
                        style={{marginBottom: 10}}
                    />
                    <TextField 
                        label="Name" 
                        variant="outlined" 
                        fullWidth 
                        required 
                        name='fullName'
                        value={fullName}
                        onChange={handleInputChange}
                        helperText={null}
                        error={false}
                        style={{marginBottom: 10}}
                    />
                </form>

                {
                    error && <Alert severity="error" style={{marginBottom: 10}}>{error}</Alert>
                }

                <Button 
                    variant="contained" 
                    style={{background: '#7c3aed'}}
                    onClick={() => handleSignUp()}
                >
                        {
                            loading ?
                            <CircularProgress size={14} style={{color: '#fff'}}/>
                            :
                            <Typography style={{fontSize: 14}}>
                                Sign up
                            </Typography>
                        }
                </Button>
                
                <Button variant="text" style={{color: '#7c3aed', marginTop: 4, fontWeight: 'normal', fontSize: 13}} onClick={() => navigate('/login')}>Sign In</Button>
            </div>
            
        </Container>
    </Grid>
    )
}
