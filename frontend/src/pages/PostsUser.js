import React, { Component } from 'react'
import AuthService from '../Auth/AuthService';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';

import FeaturedPost from '../components/FeaturedPost'

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';


import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { Box, Button, Stack } from '@mui/material';
import HeroSection from '../components/HeroSection';

const defaultTheme = createTheme();


export default function PostsUser(props) {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);
    const [posts, setPosts] = useState([]);
    const { username } = useParams();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}post/user_posts/${username}/`)
          .then(response => {
            setPosts(response.data); 
          })
          .catch(error => {
            console.error('Error fetching post data:', error);
          });

          setTimeout(() => {
            if (posts.length === 0) {
              setShowNoPostsText(true);
            }
          }, 2000);

      }, [username]);

      const [showNoPostsText, setShowNoPostsText] = useState(false);

      return (
        <div>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
          <Container maxWidth="lg">
          <HeroSection title={`Posts by ${username}`} description={`Explore ${username}'s collection of content.`}/>          
        {posts.length > 0 ? (
        <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item xs={12} md={6} mt={3} key={post.id}>
                <CardActionArea >
                  <CardMedia
                    component="img"
                    sx={{ height: 240 }}
                    image={'https://source.unsplash.com/random?wallpapers'} 
                    alt={post.imageLabel}
                  />
                  <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                      <Typography component="h2" variant="h5">
                        {post.title}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        {post.date}
                      </Typography>
                      <Typography variant="subtitle1" paragraph>
                        {post.description}
                      </Typography>
                      <Typography variant="subtitle1" color="primary">
                        Continue reading...
                      </Typography>
                    </CardContent>
                    <CardContent
                      sx={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'left',
                      }}
                    >
                      <Chip label={post.category_names} />
                      <Chip label={post.created_at} />
                      <Chip
                        avatar={
                          <Avatar
                            alt="Author"
                            src="/static/images/avatar/1.jpg"
                          />
                        }
                        label={post.author}
                      />
                    </CardContent>
                  </Card>
                </CardActionArea>
                
              </Grid>
              
            ))}
          </Grid>
          ) : (
            <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
            >
            <Container maxWidth="sm">
              {showNoPostsText && (
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={4} // Adjust spacing as needed
                >
                  <Typography
                    component="h2"
                    variant="h5"
                    align="center"
                    color="text.secondary"
                    gutterBottom
                  >
                    No posts created by {username} to the date.
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    href={`/users/`}
                  >
                    Go back to users list
                  </Button>
                </Stack>
              )}
            </Container>
            </Box>
            )}
          </Container>

          </ThemeProvider>

        </div>
      );
    }