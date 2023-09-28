import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import FeaturedPost from '../components/FeaturedPost';import Footer from '../components/Footer';
import post1 from '../Assets/Posts/blog-post.1.md';
import post2 from '../Assets/Posts/blog-post.2.md';
import post3 from '../Assets/Posts/blog-post.3.md';
import AppBar from '../components/AppBar'


import { useState, useEffect } from 'react';
import AuthService from '../components/AuthService';import { fetchPosts } from '../components/fetchPosts';

import OpenIconSpeedDial from '../components/OpenIconSpeedDial'
import { SpeedDial } from '@mui/material';

const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Blog() {

  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);

  const [posts1, setPosts1] = useState([]);

  useEffect(() => {
    // Fetch posts when the component mounts
    fetchPosts()
      .then((response) => {
        setPosts1(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);


  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar currentUser={currentUser} />
      <Container maxWidth="lg">
        <Header title="Not Boring Blog" sections={sections} />
        <main>
          <Grid sx={{mt: 1}} container spacing={4}>
            {posts1.map((posts1) => (
              <FeaturedPost key={posts1.title}   linkText={'Continue reading…'} image={'https://source.unsplash.com/random?wallpapers'} post={posts1} />
              ))
            }
          </Grid>
        </main>
      </Container>
            <OpenIconSpeedDial />
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}