import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields({ label, data }) {
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
        id={`outlined-multiline-${label}`}
        label={label}
        multiline
        rows={4}
        defaultValue={data}
        variant="outlined"
      />
    </Box>
  );
}
