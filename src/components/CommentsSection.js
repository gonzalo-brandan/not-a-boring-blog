import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import AuthService from '../components/AuthService';
import { useParams } from 'react-router-dom';
import { fetchComments } from './fetchComments';
import axios from 'axios';

function CommentsSection(props) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);

useEffect(() => {
    axios.get(`http://127.0.0.1:8000/comment/comments/${postId}/`)
      .then(response => {
        setComments(response.data); 
      })
      .catch(error => {
        console.error('Error fetching post data:', error);
      });
  }, [postId]); 
    console.log()
    
  // Function to handle user submission of a new comment
  const handleCommentSubmit = async () => {
    const storedToken = localStorage.getItem('token');
    
    try {
      const response = await fetch(`http://127.0.0.1:8000/comment/create_comment/${postId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${storedToken}`
        },
        body: JSON.stringify({ postId, body: newComment }),
      });
      if (response.ok) {
        // Comment posted successfully, update the comments list
        setComments([...comments, { text: newComment, user: 'You' }]);
        // Clear the input field
        setNewComment('');
      } else {
        console.error('Error posting comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };


  return (
    <div>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200', mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Comments
        </Typography>
        {/* Display existing comments */}
        {comments.map((comment, index) => (
          <div key={index}>
            <Typography variant="body2">
              <strong>{comment.body}</strong> {comment.text}
            </Typography>
            <hr />
          </div>
        ))}
        {/* User input section */}
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          sx={{ mt: 2 }}
        >
          Post Comment
        </Button>
      </Paper>
    </div>
  );
}

export default CommentsSection;
