import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';


function FeaturedPost(props) {
  const { post } = props;

  return (
    <Paper
  sx={{
    position: 'relative',
    backgroundColor: 'grey.800',
    color: '#fff',
    mb: 4,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundImage: `url(${props.image})`,
  }}
>
  {/* Increase the priority of the hero background image */}
  {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
    }}
  />
  <Grid container>
    <Grid item md={6}>
      <Box
        sx={{
          position: 'relative',
          p: { xs: 3, md: 6 },
          pr: { md: 0 },
        }}
      >
        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="h5" color="inherit" paragraph>
          {post.description}
        </Typography>
        <Link variant="subtitle1" href="#">
          {props.linkText}
        </Link>
      </Box>
      </Grid>
      <Grid item md={6}>
          <Grid container justifyContent="flex-end">
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // 50%
          borderRadius: '25%',
          p: 2,
          mt: 2,
          mr: 4,
          display: 'flex',
          p: { xs: 3, md: 6 },
          pr: { md: 0 },
        }}
      >       
        <Link variant="subtitle1" href="#">
          {post.category}
        </Link>
        <Link variant="subtitle1" href="#">
          {post.category}
        </Link>

      </Box>
    </Grid>
  </Grid>
  </Grid>
</Paper>
);
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
