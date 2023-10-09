import React from 'react';
import AppBar from './components/AppBar';
import Footer from './components/Footer'
import { Box } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <AppBar />
      <Box sx={{  minHeight: '100vh' }}>
         {children}
      </Box>
      <Box sx={{ mt: 10, bottom: 0 }}>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;