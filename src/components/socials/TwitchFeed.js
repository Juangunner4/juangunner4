import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { SportsEsports } from '@mui/icons-material';

const TwitchFeed = () => (
  <Card sx={{ my: 2, width: '100%' }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <SportsEsports sx={{ fontSize: 40, color: '#ff0000' }} />
      <Typography variant="h6">Watch me on Twitch</Typography>
      <Link 
        href="https://twitch.tv/juangunner4" 
        target="_blank" 
        rel="noopener noreferrer"
        sx={{ color: '#d32f2f', fontWeight: 600 }}
        underline="none"
      >
        twitch.tv/juangunner4
      </Link>
    </CardContent>
  </Card>
);

export default TwitchFeed;
