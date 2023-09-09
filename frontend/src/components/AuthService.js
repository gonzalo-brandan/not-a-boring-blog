import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const client = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include credentials for cross-origin requests if needed
});

const AuthService = {
  login: (username, email, password) => {
    return client.post('/login/', { username, email, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  },
};

export default AuthService;