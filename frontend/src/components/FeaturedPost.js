import './FeaturedPost.css'

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import { Grid, Button } from '@mui/material';

import { useState, useEffect } from 'react';
import AuthService from '../Auth/AuthService';
import { useNavigate } from 'react-router-dom';


function FeaturedPost(props) {
  const { post } = props;
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);
  const navigate = useNavigate();

  const handleClick = () => {
    if (currentUser) {
      navigate(`/post_detail/${post.id}`);
    } else {
      navigate('/login');
    }
  };

  return (

    <Grid item xs={12} md={6} style={{ marginBottom: '30px' }}>
<CardActionArea component="a" onClick={handleClick}>
    <CardMedia
      component="img"
      sx= {{ height: 240, display: { sm: 'block' } }}
      image={props.image}
      alt={post.imageLabel}
    />
  <Card sx={{ display: 'flex', flexDirection: 'column', height: 250 }}>
    <CardContent  sx={{ flex: 1 }}>
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
    <CardContent sx={{ display: 'flex',  flexDirection: 'row', gap: '0.5rem'}}>
       <Chip  label={post.category_names} />
       <Chip  label={post.created_at} />
      <Chip 
       avatar={<Avatar alt="Author" src="/static/images/avatar/1.jpg" />}
       label={post.author} 
       />

    </CardContent>
    {/* <CardContent>
      <Grid container columnSpacing={{xs:2,sm:3,md:4}}>
      <Grid className='dci' xs={6} md={6}>
        <div className='button-special'>
          <div>
          <h2>Hello</h2>
          </div>
        </div>
        <div>
        <div>
          <h2>Hello</h2>
          </div>
        </div>
      </Grid>
      </Grid>
    </CardContent> */}
  </Card>
</CardActionArea>
</Grid>
  );
} 

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    imageLabel: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default FeaturedPost;

