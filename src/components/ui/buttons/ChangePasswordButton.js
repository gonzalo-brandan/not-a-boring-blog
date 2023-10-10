import { Button, Snackbar, Stack } from '@mui/material';
import React from 'react'
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ChangePasswordButton = (props) => {
  const [open, setOpen] = React.useState(false);

     const handleClick = () => {
         handleUpdatePassword();
       setOpen(true);
     };

     const handleClose = (reason) => {
       if (reason === 'clickaway') {
         return;
       }

       setOpen(false);
     };

    const handleUpdatePassword = async (event) => {
    const storedToken = localStorage.getItem('token');
 
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}user/change_password/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${storedToken}`,
        },
        body: JSON.stringify({ current_password: props.oldPassword , new_password: props.newPassword, confirm_password: props.confirmPassword }),
      });
  
      if (response.ok) {
        console.log('Password updated successfully');
      } else {
        console.error('Error updating Password');
        setOpen(false)
      }
    } catch (error) {
      console.error('Error updating Password:', error);
    }
  };
  return(
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Button variant="contained" onClick={handleClick}>
        Change Password
      </Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Password changed successfully!
        </Alert>
      </Snackbar>
    </Stack>
)};

export default ChangePasswordButton;