import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Twitter } from '@mui/icons-material';
import { useProfile } from '../../ProfileContext';

const XFeed = () => {
  const { isWeb3 } = useProfile();
  const handle = isWeb3 ? '0x1Juangunner4' : 'juangunner4';

  return (
    <Card sx={{ my: 2, width: '100%' }}>
      <CardContent sx={{ textAlign: 'center' }}>
        <Twitter sx={{ fontSize: 40, color: '#ff0000' }} />
        <Typography variant="h6">Follow me on X</Typography>
        <Link 
          href={`https://twitter.com/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#d32f2f', fontWeight: 600 }}
          underline="none"
        >
          @{handle}
        </Link>
      </CardContent>
    </Card>
  );
};

export default XFeed;
