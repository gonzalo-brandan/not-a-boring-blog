import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Footer from './Footer';
import post1 from '../Assets/Posts/blog-post.1.md';
import post2 from '../Assets/Posts/blog-post.2.md';
import post3 from '../Assets/Posts/blog-post.3.md';
import AppBar from './AppBar'
import { useState, useEffect } from 'react';
import AuthService from './AuthService';
import axios from 'axios'
import { fetchPosts } from './fetchPosts';

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



const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

// const featuredPosts = [
//   {
//     title: 'Featured post',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random?wallpapers',
//     imageLabel: 'Image Text',
//   },
//   {
//     title: 'Post title',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random?wallpapers',
//     imageLabel: 'Image Text',
//   },
// ];

const posts = [post1, post2, post3];


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
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {posts1.map((posts1) => (
              <FeaturedPost key={posts1.title}   linkText={'Continue reading…'} image={'https://source.unsplash.com/random?wallpapers'} post={posts1} />
            ))}
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