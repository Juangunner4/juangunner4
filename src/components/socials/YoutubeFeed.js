import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { YouTube } from '@mui/icons-material';

const YoutubeFeed = () => (
  <Card sx={{ my: 2, width: '100%' }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <YouTube sx={{ fontSize: 40, color: '#ff0000' }} />
      <Typography variant="h6">Subscribe on YouTube</Typography>
      <Link href="https://www.youtube.com/@juangunner4" target="_blank" rel="noopener noreferrer">
        @juangunner4
      </Link>
    </CardContent>
  </Card>
);

export default YoutubeFeed;
