import axios from 'axios';

export function fetchPosts() {
  return axios.get('http://3.76.116.201/post/public_posts/');
}