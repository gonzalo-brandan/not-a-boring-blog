import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';
import PasswordField from '../components/PasswordField';
import ChangePasswordButton from '../components/ui/buttons/ChangePasswordButton';
import UpdateBioButton from '../components/ui/buttons/UpdateBioButton'
import UploadImageButton from '../components/ui/buttons/UploadImageButton'

const defaultTheme = createTheme();

export default function CreatePost() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_BASE_URL}user/update_bio/`)
      .then((response) => {
        const bioData = response.data
        const bioText = bioData.bio
        setBio(bioText);
      })
      .catch((error) => {
        console.error('Error fetching bio data:', error);
      });
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
          component="form"
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              My Account
            </Typography>
            <Typography
              variant="h5"
              align="center"
              marginBottom="4rem"
              color="text.secondary"
              paragraph
            >
              Here you can see, add or edit your information.
            </Typography>
            <Stack direction="column" spacing={4} justifyContent="center">
              <UploadImageButton />
              <PasswordField
                name="oldPassword"
                label="Old Password"
                id="oldPassword"
                autoComplete="old-password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <PasswordField
                name="newPassword"
                label="New Password"
                id="newPassword"
                autoComplete="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <PasswordField
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                autoComplete="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <ChangePasswordButton oldPassword={oldPassword} newPassword={newPassword} confirmPassword={confirmPassword}/>
              <TextField
                id="outlined-multiline-body"
                name='bio'
                label="Bio"
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                required
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <UpdateBioButton bio={bio} />
            </Stack>
          </Container>
        </Box>
      </main>
    </ThemeProvider>
  );
}
