import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { 
            m: 1,
            width: '100%',},
        
      }}
      noValidate
      autoComplete="off"/*  */
    >
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        multiline
        rows={4}
      />
    </Box>
  );
}