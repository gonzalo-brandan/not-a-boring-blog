import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const defaultTheme = createTheme();

export default function CreatePost() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState([]);
  const [minRead, setMinRead] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_BASE_URL}category/list_categories/`)
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching post data:', error);
      });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const storedToken = localStorage.getItem('token');

    if (!category) {
      console.error('Selected category not found');
      return;
    }

    const postData = {
      title: title,
      category: [category],
      status: status,
      min_read: minRead,
      description: description,
      body: body,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}post/post_create/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${storedToken}`,
        },
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
    navigate('/');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
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
            <Typography
              variant="h5"
              align="center"
              marginBottom="4rem"
              color="text.secondary"
              paragraph
            >
              Share your ideas with the world.
            </Typography>
            <Stack direction="column" spacing={4} justifyContent="center">
              <TextField
                id="outlined-multiline-title"
                label="Title"
                multiline
                rows={1}
                variant="outlined"
                fullWidth
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                id="outlined-multiline-description"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                id="outlined-multiline-body"
                label="Body"
                multiline
                rows={24}
                variant="outlined"
                fullWidth
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <TextField
                id="outlined-multiline-title"
                label="Minutes for reading"
                multiline
                rows={1}
                variant="outlined"
                fullWidth
                required
                value={minRead}
                onChange={(e) => setMinRead(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="category"
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat.pk} value={cat.id}>
                      {cat.category_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="status"
                  value={status}
                  label="Status"
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value='published'>Publish</MenuItem>
                  <MenuItem value='private'>Private</MenuItem>    
                  <MenuItem value='editing'>Editing</MenuItem>  
                </Select>
              </FormControl>
              <Button type="submit" variant="contained">
                Create new post
              </Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
