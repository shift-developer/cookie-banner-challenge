import React, { useContext } from 'react'
import { AppBar, IconButton, Toolbar, Typography, Box, Tooltip } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../../auth/authContext';
import { useNavigate } from 'react-router-dom';
import { types } from '../../types';

export const Navbar = () => {

    const { user, dispatch } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleLogout = () => {
        
        dispatch({ type: types.logout });

        navigate('/login', {
            replace: true
        });
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{background: '#7c3aed'}}>
        <Toolbar variant="dense">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CMP
          </Typography>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div style={{display: 'flex', justifyContent: 'space-between', marginRight: 15, alignItems: 'center'}}>
                <AccountCircle />
                <Typography style={{marginLeft: 5}}>{user.fullName || ''}</Typography>
              </div>
            <Tooltip title="Log Out">
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => handleLogout()}
            >
                <LogoutIcon />
            </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
      </AppBar>
      </Box>
    )
}
