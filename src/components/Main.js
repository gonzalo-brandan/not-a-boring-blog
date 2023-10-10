import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Markdown from './Markdown';
import CommentsSection from './CommentsSection';


function Main(props) {
  const { author, description, title, category, body } = props;

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
      <>
      <Markdown sx={{mt:3}}className="markdown" >
        {body}
      </Markdown>
      <CommentsSection postId='' />
      </>
    )} 
    
    </Grid>
    
    
  );
}

Main.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  category: PropTypes.array,
};

export default Main;