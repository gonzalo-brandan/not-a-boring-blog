import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import ReplyIcon from '@mui/icons-material/Reply';
import CommentIcon from '@mui/icons-material/Comment';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import DeleteCommentIcon from './DeleteCommentIcon';

import { List, Card, ListItem, ListItemText, ListItemAvatar, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AuthService from '../components/AuthService';
import { useParams } from 'react-router-dom';
import { fetchComments } from './fetchComments';
import axios from 'axios';



function CommentsSection(props) {

  const [replyText, setReplyText] = useState('');
  const [isReplying, setIsReplying] = useState(false); // State to track whether the user is replying

  const handleReplySubmit = () => {
    setReplyText('');

    if (props.onReply) {
      props.onReply(replyText);
    }

    setIsReplying(false);
  };
  
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);

  useEffect(() => {
    // Fetch the current user
    const getCurrentUser = async () => {
      const currentUser = await AuthService.getCurrentUser();
      setCurrentUser(currentUser);
    };

    getCurrentUser();
  }, []);
  
useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}comment/comments/${postId}/`)
      .then(response => {
        setComments(response.data); 
      })
      .catch(error => {
        console.error('Error fetching post data:', error);
      });
  }, [postId]); 
    
  const handleCommentSubmit = async () => {
    const storedToken = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}comment/create_comment/${postId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${storedToken}`
        },
        body: JSON.stringify({ postId, body: newComment, author_username: 'mod'}),
      });

      if (response.ok) {
        const responseData = await response.json();
        setComments([{ body: newComment, author_username: responseData.author_username },...comments]);
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
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mt: 2, background: 'white' }}
          />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCommentSubmit}
          sx={{ mt: 2 }}
          >
          Post Comment
        </Button>        
        {comments && comments.map((comment, index) => (
            <Card sx={{ p: 2, mt: 3, mb: 3 }}>
              <List sx={{ py: 0 }}>
                <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                  <ListItemAvatar>
                    <Avatar alt="User" src="/user-avatar.jpg" />
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ py: 0 }}
                    primary={comment.author_username}
                    secondary={comment.body}
                  />
                  
                </ListItem>
                <IconButton aria-label="reply">
                  <ReplyIcon />
                </IconButton>
                <IconButton aria-label="comments">
                  <CommentIcon />
                </IconButton>
            {/* REPLY */}
            {/* {isReplying ? ( // Render the input field if isReplying is true
            <div>
            <TextField
            label="Reply to comment"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleReplySubmit}
            sx={{ mt: 2 }}
          >
            Reply
          </Button>
        </div>
      ) : (
        // Render the "Reply" button if isReplying is false
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setIsReplying(true)} 
          sx={{ mt: 2 }}
        >
          Reply
        </Button>
      )} */}
        <List>
        {comment.replies && comment.replies.map((reply) => (
            <ListItem key={reply.id} alignItems="center" disableGutters>
              <ListItemAvatar>
                <Avatar alt="User" src="/user-avatar.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={reply.author_username}
                secondary={reply.body}
              />
              {/* You can add more buttons or actions for each reply here */}
            </ListItem>
          ))}
        </List>
    
    </List>
  </Card>
))}
          
      </Paper>
    </div>
  );
}

export default CommentsSection;
