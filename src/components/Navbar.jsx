import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 ,minWidth:'100vw'}}>
    <AppBar position="static" sx={{ backgroundColor: '#212121' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1  ,fontFamily: 'Dosis, sans-serif', 
  fontWeight: 600, }}>
          urlShortener
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
  )
}

export default Navbar

