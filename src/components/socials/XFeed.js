import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Twitter } from '@mui/icons-material';

const XFeed = () => (
  <Card sx={{ my: 2 }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <Twitter sx={{ fontSize: 40, color: '#ff0000' }} />
      <Typography variant="h6">Follow me on X</Typography>
      <Link href="https://twitter.com/juangunner4" target="_blank" rel="noopener noreferrer">
        @juangunner4
      </Link>
    </CardContent>
  </Card>
);

export default XFeed;
