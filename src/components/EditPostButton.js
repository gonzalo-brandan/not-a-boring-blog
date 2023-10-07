import React from 'react'
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';

export default function EditPostButton({postId}) {
    const navigate = useNavigate();

    const handleRedirectEdit = (postId) => {
        navigate(`/edit_post/${postId}`);
      };
  
  return (
    <div>
        <Button startIcon={<EditIcon />} variant="contained" size="small" onClick={() => handleRedirectEdit(postId)}>Edit</Button>
    </div>
  )
}
