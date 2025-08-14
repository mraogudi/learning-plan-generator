import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import {
  School,
  Home,
  AssignmentTurnedIn,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ mr: 2 }}
          onClick={() => navigate('/')}
        >
          <School fontSize="large" />
        </IconButton>
        
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Learning Plan Generator
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            variant={location.pathname === '/' ? 'outlined' : 'text'}
            sx={{
              color: 'white',
              borderColor: location.pathname === '/' ? 'white' : 'transparent',
            }}
          >
            Create Plan
          </Button>
          
          <Button
            color="inherit"
            startIcon={<AssignmentTurnedIn />}
            onClick={() => navigate('/results')}
            variant={location.pathname === '/results' ? 'outlined' : 'text'}
            sx={{
              color: 'white',
              borderColor: location.pathname === '/results' ? 'white' : 'transparent',
            }}
          >
            View Results
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 