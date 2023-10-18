import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BACKEND_BASE_URL}`;


const client = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include credentials for cross-origin requests if needed
});

const AuthService = {
  login: (username, email, password) => {
    return client.post('/user/login/', { username, email, password })
      .then(response => {
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('is_moderator', response.data.role.is_moderator);

        }
        return response.data;
      });
  },

  logout: () => {
    localStorage.removeItem('token');
    window.location.reload();
  },
  getCurrentUser: () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      axios.defaults.headers.common['Authorization'] = `Token ${storedToken}`;
      return true;
    }
    return false;
  },
};


export default AuthService;