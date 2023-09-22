import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';

function Main(props) {
  const { author, description, title, category } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >

      <Typography variant="h3" >
        {title}
      </Typography>
      <Typography variant="h7" gutterBottom>
        By {author}
      </Typography>
      <Divider sx={{mb:3}} />
      {description && (
      <Markdown sx={{mt:3}}className="markdown" >
        {description}
      </Markdown>
    )}

    </Grid>
  );
}

Main.propTypes = {
  description: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Main;