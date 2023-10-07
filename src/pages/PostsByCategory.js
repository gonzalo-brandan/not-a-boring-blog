import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import FeaturedPost from '../components/FeaturedPost';
import { useParams } from 'react-router-dom';

import { useState, useEffect } from 'react';
import AuthService from '../components/AuthService';import { fetchPosts } from '../components/fetchPosts';

import OpenIconSpeedDial from '../components/OpenIconSpeedDial'

const defaultTheme = createTheme();

export default function Blog() {
  const { category_name } = useParams();
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPostsByCategory = async (categoryName) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}category/posts/${categoryName}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  };


  useEffect(() => {
    fetchPostsByCategory(category_name)
      .then((data) => {
        setFilteredPosts(data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, [category_name]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Not Boring Blog" />
        <main>
          <Grid sx={{mt: 1}} container spacing={4}>
          {filteredPosts.map((post) => (
        <FeaturedPost key={post.id} linkText={'Continue reading…'} image={'https://source.unsplash.com/random?wallpapers'} post={post} />
        ))}
          </Grid>
        </main>
      </Container>
            <OpenIconSpeedDial />
    </ThemeProvider>
  );
}