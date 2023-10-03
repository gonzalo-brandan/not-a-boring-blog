import { List, Card, ListItem, ListItemText, ListItemAvatar } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function RelatedPostCard(props) {
    const { title, author } = props;
    return(
<Card sx={{ p: 2 }}>
<List sx={{ py: 0 }}>
  {/* Placeholder text */}
  <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
    <ListItemAvatar>
      <Avatar alt="User" src="/user-avatar.jpg" />
    </ListItemAvatar>
    <ListItemText
      sx={{ py: 0 }}
      primary={title}
      secondary={author}
    />
  </ListItem>
</List>
</Card>
    )
}

export default RelatedPostCard