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
import AppBar from '../components/AppBar'
import { useState, useEffect } from 'react';
import Footer from '../components/Footer'
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const categories = [
    { pk: 1, name: 'Tech' },
    // Add more categories here
  ];

  export default function CreatePost() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const storedToken = localStorage.getItem('token');
        const selectedCategoryName = formData.get("category");
        

        const selectedCategory = categories.find(category => category.name === selectedCategoryName);
        if (!selectedCategory) {
          console.error('Selected category not found');
          return;
        }

        const postData = {
          title: title,
          category: [selectedCategory.pk],
          status:'published',
          min_read:'5',
          description: description,
          body: body,
        };

        try {
          const response = await fetch('http://127.0.0.1:8000/post/post_create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${storedToken}`},
            body: JSON.stringify(postData),
          });
    
          if (response.ok) {
            console.log('Post created successfully');
          } else {
            console.error('Error creating post');
          }
        } catch (error) {
          console.error('Error creating post:', error);
        }
        navigate('/')
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

            <TextField
              id="outlined-multiline-title"
              label="Title"
              multiline
              rows={1}
              variant="outlined"
              fullWidth
              required
              value={title} // Bind to the state variable
              onChange={(e) => setTitle(e.target.value)} // Update the state variable on change
            />

            <TextField
              id="outlined-multiline-description"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              required
              value={description} // Bind to the state variable
              onChange={(e) => setDescription(e.target.value)} // Update the state variable on change
            />

            <TextField
              id="outlined-multiline-body"
              label="Body"
              multiline
              rows={24}
              variant="outlined"
              fullWidth
              required
              value={body} // Bind to the state variable
              onChange={(e) => setBody(e.target.value)} // Update the state variable on change
            />

            <TextField
                id="outlined-select-category"
                select
                label="Category"
                name="category"
                variant="outlined"
                fullWidth
                required
                SelectProps={{
                  native: true,
                }}
              >
                {categories.map((category) => (
                  <option key={category.pk} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </TextField>
            <Button 
            type="submit"
            variant="contained">Create new post</Button>
            </Stack>
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
}