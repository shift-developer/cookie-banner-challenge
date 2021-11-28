import React, { useContext, useState } from 'react'

import { AuthContext } from '../../auth/authContext';
import { types } from '../../types';
import { useNavigate } from 'react-router-dom';

import { Logo } from './Logo';
import { Button, Container, Grid, Box, TextField, CircularProgress, Typography, Alert } from '@mui/material'
import { login, userInfo } from '../../api/apiCalls';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {

    const navigate = useNavigate()
    const { dispatch } = useContext(AuthContext)

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const [{loading, error}, setLoading] = useState({loading: false, error: null})

    const {email, password} = formValues

    const handleSignIn = async () => {
        try {
            setLoading({loading: true, error: null})
            const { token } = await login({email, password})
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
                    <form style={{marginTop: 20, marginBottom: 20}} onSubmit={() => handleSignIn()}>
                        <TextField 
                            label="Email" 
                            variant="outlined" 
                            fullWidth
                            name="email"
                            required 
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
                            value={password}
                            onChange={handleInputChange}
                            name="password"
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
                        onClick={() => handleSignIn()}
                    >
                        {
                            loading ?
                            <CircularProgress size={14} style={{color: '#fff'}}/>
                            :
                            <Typography style={{fontSize: 14}}>
                                Sign in
                            </Typography>
                        }
                    </Button>
                    <Button variant="text" style={{color: '#7c3aed', marginTop: 4, fontWeight: 'normal', fontSize: 13}} onClick={() => navigate('/register')}>Sign Up</Button>
                </div>
                
            </Container>
        </Grid>
    )
}
