import axios from 'axios';

export function fetchUsers() {

  return axios.get('https://backend.not-a-boring-blog.net/user/users_list/');
}