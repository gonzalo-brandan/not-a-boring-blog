import Button from '@mui/material/Button';


const ChangePasswordButton = (props) => {
    const handleUpdatePassword = async (event) => {
    event.preventDefault();
  
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
      }
    } catch (error) {
      console.error('Error updating Password:', error);
    }
  };
  return(

  <Button onClick={handleUpdatePassword} variant="contained">
  Change Password 2
</Button>
)};

export default ChangePasswordButton;