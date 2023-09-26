import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios'
import AuthService from '../Auth/AuthService';
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';

function Header(props) {
  const { sections, title, currentUser } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    // Your custom logic to handle the click event goes here
    console.log('Chip clicked!');
    navigate('/blog')
  };

  return (
    <React.Fragment>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{  justifyContent: 'space-between', overflowX: 'auto', mt: 2}}
      >
        {sections.map((section) => (
          // <Link
          //   underline="none"
          //   color="inherit"
          //   noWrap
          //   key={section.title}
          //   variant="body2"
          //   href={section.url}
          //   sx={{ p: 1, flexShrink: 0 }}
          // >
          //   {section.title}
          // </Link>
          <Chip label={section.title} variant="outlined" color="primary" onClick={handleClick} />
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;