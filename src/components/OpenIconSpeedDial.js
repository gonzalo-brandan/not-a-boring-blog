import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useMediaQuery } from '@mui/material';
import Link from '@mui/material/Link';

const actions = [
  { icon: <FileCopyIcon sx={{ fontSize: 30 }}/>, name: 'Create New Post', href: '/create_post' },
];

export default function OpenIconSpeedDial() {
  const isBigScreen = useMediaQuery('(min-width: 768px)'); 
  return (
    <Box sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}>
      <Link href="/create_post">
        <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{
          position: 'absolute',
          bottom: 16,
          right: 16,
          ...(isBigScreen && {
            '& .MuiFab-primary': { width: 80, height: 80 },
          }),
          
        }}
        href={'/create_post/'}
        icon={<SpeedDialIcon />}
      >
        {/* {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            href={action.href}
          />
        ))} */}
      </SpeedDial>
      </Link>
    </Box>
  );
}