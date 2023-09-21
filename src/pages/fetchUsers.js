import axios from 'axios';

export function fetchUsers() {
  return axios.get('http://127.0.0.1:8000/users_list/');
}