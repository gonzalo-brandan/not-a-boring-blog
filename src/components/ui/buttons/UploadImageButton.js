import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ onChange, value, label }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onChange(file);
  };

  return (
    <div>
      <label htmlFor="file-upload-button">
        <Button component="span" variant="outlined" startIcon={<CloudUploadIcon />}>
          {label}
        </Button>
      </label>
      <VisuallyHiddenInput
        type="file"
        id="file-upload-button"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}