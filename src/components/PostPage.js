import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AppBar from './AppBar';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Header from './Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Main from './Main';

import Sidebar from './Sidebar';
import Footer from './Footer';

const defaultTheme = createTheme();

const sidebar = {
  title: 'About The Author',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
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
    // Fetch the post data based on postId
    axios.get(`http://127.0.0.1:8000/post/post_detail/${postId}/`)
      .then(response => {
        setPost(response.data); // Update the state with the fetched post data
      })
      .catch(error => {
        console.error('Error fetching post data:', error);
      });
  }, [postId]); // Fetch data whenever postId changes

//   return (
//     <div>
//       <AppBar />
//       {/* Render the post content using the 'post' state */}
//       <h1>{post.title}</h1>
//       {/* ... other post details ... */}
//     </div>
//   );
// }

  return (
    
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
            <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title={post.title} description={post.description} />
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
