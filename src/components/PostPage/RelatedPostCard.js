import { List, Card, ListItem, ListItemText, ListItemAvatar, CardMedia, CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Auth/AuthService';
import { useState, useEffect } from 'react';

function RelatedPostCard(props) {
    const { title, author } = props;
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser);
    const { post } = props;

    const navigate = useNavigate();

    const handleClick = () => {
      if (currentUser) {
        navigate(`/post_detail/${post.id}`);
      } else {
        navigate('/login');
      }
    };
    console.log(post)
    return(
<CardActionArea sx={{ p: 2, mt: 2}} onClick={handleClick}>
<List sx={{ py: 0}}>
  {/* Placeholder text */}
  <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
    <ListItemText
      sx={{ py: 0 }}
      primary={title}
      secondary={author}
    />
  </ListItem>
</List>
</CardActionArea>
    )
}

export default RelatedPostCard