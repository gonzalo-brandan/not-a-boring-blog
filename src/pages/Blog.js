import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import FeaturedPost from '../components/FeaturedPost';
import { useState, useEffect } from 'react';
import { fetchPosts } from '../components/fetchPosts';
import OpenIconSpeedDial from '../components/OpenIconSpeedDial'

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Not Boring Blog" />
        <main>
          <Grid sx={{mt: 1}} container spacing={4}>
            {posts.map((post) => (
              <FeaturedPost key={post.id}   linkText={'Continue reading…'} image={'https://source.unsplash.com/random?wallpapers'} post={post} />
              ))
            }
          </Grid>
        </main>
      </Container>
      <OpenIconSpeedDial />
    </ThemeProvider>
  );
}