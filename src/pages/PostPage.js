import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '../components/AppBar';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Header from '../components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Main from '../components/Main';

import Sidebar from '../components/PostPage/Sidebar';
import Footer from '../components/Footer';

const defaultTheme = createTheme();

const sidebar = {
  title: 'About The Author',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

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

export default function PostPage() {
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/post/post_detail/${postId}/`)
      .then(response => {
        setPost(response.data); 
      })
      .catch(error => {
        console.error('Error fetching post data:', error);
      });
  }, [postId]); 


  return (
    
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
            <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main category={post.category} author={post.author} title={post.title} description={post.description} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}
