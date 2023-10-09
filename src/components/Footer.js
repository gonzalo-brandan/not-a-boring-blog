import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Stack } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: '#1b82d3',
        py: 2,
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Stack sx={{ alignItems: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Not a Boring Blog
          </Typography>
          <Typography variant="subtitle1" color="white">
            Explore our platform and learn more:
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          mt={3}
        >
          <Link
            href="/about-us"
            color="inherit"
            sx={{ mx: 2, textDecoration: 'none' }}
          >
            About Us
          </Link>
          <Link
            href="/about-project"
            color="inherit"
            sx={{ mx: 2, textDecoration: 'none' }}
          >
            About the Project
          </Link>
          <Link
            href="/faqs"
            color="inherit"
            sx={{ mx: 2, textDecoration: 'none' }}
          >
            FAQs
          </Link>
          <Link
            href="/contact-us"
            color="inherit"
            sx={{ mx: 2, textDecoration: 'none' }}
          >
            Contact Us
          </Link>
        </Stack>
      </Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 2,
          bgcolor: '#1b82d3',
        }}
      >
        <Typography variant="body2" color="inherit">
          {'Copyright © '}
          <Link color="inherit" href="https://mui.com/">
            NaBB
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;