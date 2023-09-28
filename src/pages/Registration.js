import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthService from '../Auth/AuthService';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Not So Boring Blog
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const client = axios.create({
  baseURL: "https://www.not-a-boring-blog.net/user/"
});

const defaultTheme = createTheme();

export default function SignUp() {
  const [currentUser, setCurrentUser] = useState();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegistration = async (event) => {
    event.preventDefault();
    const registrationData = {
      username: username,
      email: email,
      password: password,
    };

    

    try {
      const registrationResponse = await axios.post("https://www.not-a-boring-blog.net/user/register/", registrationData);
      if (registrationResponse.status === 201) {
        console.log('registration')
        const loginData = {
          username: registrationData.username,
          email: registrationData.email,
          password: registrationData.password
        };
        const loginResponse = await axios.post("https://www.not-a-boring-blog.net/user/login/", loginData);
        if (loginResponse.status === 200) {
          AuthService.login(username, email, password)
          .then(
            (response) => {
              console.log(localStorage.getItem('token'));
              setCurrentUser(true);
              navigate('/');
            },
            (error) => {
              setError('Invalid email or password');
            }
          );
        }
      }
    } catch (error) {
        if (error.response) {
          // If the error has a response from the server, it's likely a validation error
          const errorData = error.response.data;
          
          console.log(`validation error: ${JSON.stringify(error.response.data, null, 2)}`)

          if (errorData.error === 'Email already exists.') {
            setError('Email already exists');
          } else if (errorData.error === 'Username already exists.') {
            setError('Username already exists');
          } else if (errorData.error === 'Password must have at least 8 characters and special characters.') {
            setError('Password must have at least 8 characters and special characters.');
          } else {
            setError('An error occurred during registration.');
          }
        } else {
          // If there's no response (e.g., network error), display a generic error message
          setError('An error occurred during registration.');
        }
      }
    }

    function submitLogout(e) {
      e.preventDefault();
      client.get("/logout/")
        .then(function(res) {
          setCurrentUser(false);
        })
        .catch(function(error) {
          // Handle any logout errors here
          console.error("Logout failed:", error);
        });
    }

if (currentUser) {
    return (
      <div>
          <div className="center">
            <h2>You're logged in!</h2>
          </div>
          <form onSubmit={e => submitLogout(e)}>
                  <Button type="submit" variant="light">Log out</Button>
                </form>
        </div>
    );}
  return (
     <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={handleRegistration} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
              </Grid>
            </Grid>
            <p className="error">{error}</p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    
)};

