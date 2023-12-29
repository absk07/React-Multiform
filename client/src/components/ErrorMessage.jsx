import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function ErrorMessage({ children, severity, setErrMessage }) {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: '100%' }}>
      <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                setErrMessage(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          { children }
        </Alert>
      </Collapse>
    </Box>
  );
}