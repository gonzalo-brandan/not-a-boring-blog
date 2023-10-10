import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import RelatedPostCard from './RelatedPostCard'

function Sidebar(props) {
  const { archives, description, social, title, relatedPosts } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 3 }}>
        Related Posts
      </Typography>      
      {relatedPosts.slice(0, 5).map((relatedPost) => (
        <RelatedPostCard
        key={relatedPost.id}
          post={relatedPost}
          title={relatedPost.title}
          author={relatedPost.author}
        />
      ))}
    </Grid>
  );
}

Sidebar.propTypes = {
  description: PropTypes.string,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType,
      name: PropTypes.string,
    }),
  ),
  title: PropTypes.string,
};

export default Sidebar;