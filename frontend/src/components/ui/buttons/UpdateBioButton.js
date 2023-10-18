import { Button, Snackbar, Stack } from '@mui/material';
import React from 'react'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

export default function UpdateBioButton(props) {
    const bio = props.bio
    const [open, setOpen] = React.useState(false);

     const handleClick = () => {
         handleUpdateBio();
       setOpen(true);
     };

     const handleClose = (reason) => {
       if (reason === 'clickaway') {
         return;
       }

       setOpen(false);
     };

    const handleUpdateBio = async () => {
        const storedToken = localStorage.getItem('token');
        const updatedBio = bio; 
      
        try {
          const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}user/update_bio/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${storedToken}`,
            },
            body: JSON.stringify({ bio: updatedBio }),
          });
      
          if (response.ok) {
            console.log('Bio updated successfully');
          } else {
            console.error('Error updating bio');
            setOpen(false)
          }
        } catch (error) {
          console.error('Error updating bio:', error);
        }
        ;
      };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Button variant="contained" onClick={handleClick}>
        Update Bio
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Bio updated successfully!
        </Alert>
      </Snackbar>
    </Stack>

  )
  }