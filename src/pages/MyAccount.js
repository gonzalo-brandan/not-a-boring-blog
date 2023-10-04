import * as React from 'react';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '../components/AppBar';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const defaultTheme = createTheme();

export default function CreatePost() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');



  const navigate = useNavigate();

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_BACKEND_BASE_URL}category/list_categories/`)
  //     .then((response) => {
  //       setCategories(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching post data:', error);
  //     });
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const storedToken = localStorage.getItem('token');

    const userData = {
      username: username,
      email: email,
      bio: bio,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}post/post_create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${storedToken}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log('Post created successfully');
      } else {
        console.error('Error creating post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
    navigate('/');
  };

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
          onSubmit={handleSubmit}
          component="form"
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Account
            </Typography>
            <Typography
              variant="h5"
              align="center"
              marginBottom="4rem"
              color="text.secondary"
              paragraph
            >
              Here you can see, add or edit your information.
            </Typography>
            <Stack direction="column" spacing={4} justifyContent="center">
              <TextField
                 id="outlined"
                label="Username"
                rows={1}
                fullWidth
                
                defaultValue={username}
                // value=
                onChange={(e) => setUsername(e.target.value)}
              />
                      <TextField
          id="outlined"
          label="My username"
          defaultValue="Username"
        />
              <TextField
                id="outlined-multiline-description"
                label="Email"
                multiline
                rows={1}
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                id="outlined-multiline-body"
                label="Bio"
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <Button type="submit" variant="contained">
                Update
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}