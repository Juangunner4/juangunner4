import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Instagram } from '@mui/icons-material';

const InstagramFeed = () => (
  <Card sx={{ my: 2, width: '100%', maxWidth: '90%', mx: 'auto' }}>
    <CardContent 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        textAlign: 'center'
      }}
    >
      <Instagram sx={{ fontSize: 40, color: '#ff0000' }} />
      <Typography variant="h6">Follow me on Instagram</Typography>
      <Link 
        href="https://www.instagram.com/juangunner4" 
        target="_blank" 
        rel="noopener noreferrer"
        sx={{ color: '#d32f2f', fontWeight: 600 }}
        underline="none"
      >
        @juangunner4
      </Link>
    </CardContent>
  </Card>
);

export default InstagramFeed;
