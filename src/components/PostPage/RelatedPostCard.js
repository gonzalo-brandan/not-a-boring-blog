import { List, Card, ListItem, ListItemText, ListItemAvatar, CardMedia, CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../Auth/AuthService';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const defaultTheme = createTheme();

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

    return(
<CardActionArea sx={{ 
  p: 2, 
  mt: 2,   
  border: `1px solid ${defaultTheme.palette.primary.main}`,
  borderRadius: 4,
  boxShadow: `0 0 5px 0 ${defaultTheme.palette.primary.main}`,}} 
  onClick={handleClick}>
  <List sx={{ py: 0}}>
  {/* Placeholder text */}
  <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
    <ListItemText
      sx={{ py: 0 }}
      primary={title}
      secondary={`Posted by ${author}`}
    />
  </ListItem>
</List>
</CardActionArea>
    )
}

export default RelatedPostCard