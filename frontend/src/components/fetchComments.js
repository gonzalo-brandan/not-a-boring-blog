import axios from 'axios';

export function fetchComments(props) {
    const { post_id } = props;
  return axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}comment/comments/${post_id}/`);
}