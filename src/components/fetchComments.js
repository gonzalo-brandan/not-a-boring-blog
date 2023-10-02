import axios from 'axios';

export function fetchComments(props) {
    const { post_id } = props;
  return axios.get(`https://backend.not-a-boring-blog.net/comment/comments/${post_id}/`);
}