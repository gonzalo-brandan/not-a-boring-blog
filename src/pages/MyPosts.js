import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import DeleteButton from '../components/DeleteButton';
import HeroSection from '../components/HeroSection';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function MyPosts() {
    const [posts, setPosts] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const navigate = useNavigate();

    const handlePostDeleteSuccess = () => {
        setShowSuccessAlert(true);
      };
    
    const handleRedirectEdit = (postId) => {
      navigate(`/edit_post/${postId}`);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}post/my_posts/`)
          .then(response => {
            setPosts(response.data); 
          })
          .catch(error => {
            console.error('Error fetching post data:', error);
          });
      }, []); 

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
      {showSuccessAlert && (
          <Alert severity="success">Post deleted successfully! Refresh the page to see the changes.</Alert>
      )}
      <Container sx={{ py: 1 }} maxWidth="md">
        <HeroSection
          title="Your Posts"
          description="Manage and view your posts. Add, edit, or delete posts as needed."
          primaryButtonText="Add New Post"
        />
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid item key={post.id} xs={12} sm={6} md={4}>
                <CardActionArea component="a" onClick={() => handleRedirectEdit(post.id)}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image="https://source.unsplash.com/random?wallpapers"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {post.title}
                    </Typography>
                    <Typography>
                      {post.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{gap: 2}}>
                    <DeleteButton postId={post.id} onDeleteSuccess={handlePostDeleteSuccess} />
                    <Link href=''><Button startIcon={<EditIcon />} variant="contained" size="small" >Edit</Button></Link>
                  </CardActions>
                </Card>
            </CardActionArea>
              </Grid>
            ))}
          </Grid>
        </Container>
        </main>
    </ThemeProvider>
  )
}


