import axios from 'axios';

export function fetchUsers() {
  return axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}user/users_list/`);
}