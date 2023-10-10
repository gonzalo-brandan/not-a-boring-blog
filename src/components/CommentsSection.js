import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { List, Card, ListItem, ListItemText, ListItemAvatar, IconButton, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AuthService from '../components/AuthService';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteCommentButton from './ui/buttons/DeleteCommentButton';

function CommentsSection(props) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const { postId } = useParams();
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [open, setOpen] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState(null); // State to store comment ID to delete

  const handleClickOpen = (commentId) => {
    setCommentIdToDelete(commentId); // Set the comment ID to delete
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
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

  const fetchAndUpdateComments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}comment/comments/${postId}/`);
      if (response.status === 200) {
        setComments(response.data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = async () => {
    const storedToken = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}comment/create_comment/${postId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${storedToken}`
        },
        body: JSON.stringify({ postId, body: newComment, author_username: 'mod' }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setNewComment('');
        fetchAndUpdateComments();
      } else {
        console.error('Error posting comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleCommentDeletion = async () => {
    const storedToken = localStorage.getItem('token');
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}comment/update_comment/${commentIdToDelete}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${storedToken}`
        },
      });

      if (response.ok) {
        const updatedComments = comments.filter((comment) => comment.id !== commentIdToDelete);
        setComments(updatedComments);
        handleClose();
      } else {
        console.error('Error deleting comment');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
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
              {localStorage.username === comment.author_username && (
                <div>
                  <IconButton
                    aria-label="delete"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                    onClick={() => handleClickOpen(comment.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Do you want to delete this comment?"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        This is an irreversible action.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                      <Button variant="outlined" color="error" onClick={handleCommentDeletion} autoFocus>Delete</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              )}
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
