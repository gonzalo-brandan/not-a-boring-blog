import axios from 'axios';

export function fetchPosts() {
  return axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}post/public_posts/`);
}