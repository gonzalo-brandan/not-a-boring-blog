import axios from 'axios';

export function fetchUsers() {
  return axios.get('http://3.76.116.201/user/users_list/');
}