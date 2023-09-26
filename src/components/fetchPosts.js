import axios from 'axios';

export function fetchPosts() {
  return axios.get('http://127.0.0.1:8000/post/public_posts/');
}