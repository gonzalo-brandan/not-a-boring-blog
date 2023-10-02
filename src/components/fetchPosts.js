import axios from 'axios';

export function fetchPosts() {

  return axios.get('https://backend.not-a-boring-blog.net/post/public_posts/');

}