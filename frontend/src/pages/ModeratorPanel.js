import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import HeroSection from '../components/HeroSection';


const defaultTheme = createTheme();

export default function ModeratorPanel() {
  const [category, setCategory] = useState('');



  const handleClick = async (event) => {
    event.preventDefault();

    const storedToken = localStorage.getItem('token');

    if (!category) {
      console.error('Selected category not found');
      return;
    }

    const postData = {
      category_name: category
      };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}category/create_category/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${storedToken}`,
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        console.log('Category created successfully');
      } else {
        console.error('Error creating Category');
      }
    } catch (error) {
      console.error('Error creating Category:', error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 1,
            pb: 6,
          }}
          component="form"
        >
          <Container maxWidth="sm">
            <HeroSection title={'Moderator Panel'} description={'As moderator you have more privileges as a common user.'}/>
            <Stack direction="column" spacing={4} justifyContent="center">
              <TextField
                id="outlined-multiline-body"
                name='bio'
                label="New Category Name"
                multiline
                rows={1}
                variant="outlined"
                fullWidth
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <Button variant="contained" onClick={handleClick}>
                Create Category
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
