import React, { Component } from 'react'
import AppBar from '../components/AppBar'
import AuthService from '../Auth/AuthService';
import { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';

import FeaturedPost from '../components/FeaturedPost';

export default function PostsUser(props) {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);
    const [posts, setPosts] = useState([]);
    const { username } = useParams();


    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/post/user_posts/${username}/`)
          .then(response => {
            setPosts(response.data); 
          })
          .catch(error => {
            console.error('Error fetching post data:', error);
          });
      }, [username]);

    return(
        <AppBar currentUser={currentUser} />

    )

}
