import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const HeroSection = ({ title, description, hrefPrimaryButton, primaryButtonText, secondaryButtonText }) => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          {description}
        </Typography>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          {primaryButtonText && (
            <Button href={hrefPrimaryButton} variant="contained" color="primary">
              {primaryButtonText}
            </Button>
          )}
          {secondaryButtonText && (
            <Button variant="outlined" color="secondary">
              {secondaryButtonText}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default HeroSection;