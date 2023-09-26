import axios from 'axios';

export function fetchComments(props) {
    const { post_id } = props;
  return axios.get(`http://127.0.0.1:8000/comment/comments/${post_id}/`);
}