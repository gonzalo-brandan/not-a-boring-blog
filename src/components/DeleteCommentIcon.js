import React, { Component } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/material';

export default class DeleteCommentIcon extends Component {
    render() {
      const { commentAuthor, loggedInUser, onDeleteClick } = this.props;
  
      // Conditionally render the delete button if the comment author matches the logged-in user
      if (commentAuthor === loggedInUser) {
        return (
          <IconButton aria-label="delete" onClick={onDeleteClick}>
            <DeleteOutlineIcon />
          </IconButton>
        );
      } else {
        // If the comment author is not the logged-in user, you can choose to render nothing or a placeholder
        return null;
      }
    }
  }
