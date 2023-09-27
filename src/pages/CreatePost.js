import * as React from 'react';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '../components/AppBar'
import { fetchUsers } from '../components/fetchUsers';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer'

import MultilineTextFields from '../components/TextInput';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();


export default function CreatePost() {


  return (
    
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Create Post
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Create a new Post
            </Typography>
            <Typography variant="h5" align="center" marginBottom='4rem' color="text.secondary" paragraph>
                Share your ideas with the world.
            </Typography>
            <Stack
              direction="column"
              spacing={4}
              justifyContent="center"
            >
            <MultilineTextFields />
            <MultilineTextFields />
            <MultilineTextFields />
            <MultilineTextFields />
            <Button variant="contained">Create new post</Button>
            </Stack>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}