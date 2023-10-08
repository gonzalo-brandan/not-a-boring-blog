import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from '@mui/material';
import { useState } from 'react';

export default function AlertDialog({postId, onDeleteSuccess}) {
  const [open, setOpen] = React.useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePost = async () => {
    const storedToken = localStorage.getItem('token');

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}post/post_detail/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${storedToken}`,
        },
      });

      if (response.ok) {
        console.log('Post deleted successfully');
        onDeleteSuccess();  
        setShowSuccessAlert(true);
                // Optionally, you can perform additional actions after successful deletion
      } else {
        console.error('Error deleting post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }

    handleClose();
  };

  return (
    <div>
      <Button variant="contained" size="small" color="error" startIcon={<DeleteIcon />} onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is a irreversible action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="outlined" color="error" onClick={handleDeletePost} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}