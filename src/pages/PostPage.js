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
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const sidebar = {
    title: 'About The Author',
    description:
      post.bio,
    social: [
      { name: 'GitHub', icon: GitHubIcon },
      { name: 'Twitter', icon: TwitterIcon },
      { name: 'Facebook', icon: FacebookIcon },
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}post/post_detail/${postId}/`);
        setPost(postResponse.data);
        const publicPostsResponse = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}post/public_posts/`);
    
        const filteredPosts = publicPostsResponse.data.filter(publicPost => {
          if (postResponse.data.category) {
            return (
              postResponse.data.category.some(category => publicPost.category.includes(category)) &&
              postResponse.data.id !== publicPost.id
            );
          }
          return false;
        });

        setFilteredPosts(filteredPosts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [postId]);

  useEffect(() => {
    setRelatedPosts(filteredPosts);
  }, [filteredPosts]);

  return (
    
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar />
      <Container maxWidth="lg">
        <Header title="Blog" sections={sections} />
        <main>
            <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main category={post.category} author={post.author} title={post.title} description={post.description} body={post.body}/>
            <Sidebar
  title={sidebar.title}
  description={sidebar.description}
  archives={sidebar.archives}
  social={sidebar.social}
  relatedPosts={relatedPosts}
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
