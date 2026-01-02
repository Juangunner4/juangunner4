import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { YouTube } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const YoutubeFeed = () => {
  const { t } = useTranslation();

  return (
    <Card sx={{ my: 2, width: '100%', maxWidth: '90%', mx: 'auto' }}>
      <CardContent 
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          textAlign: 'center'
        }}
      >
        <YouTube sx={{ fontSize: 40, color: '#ff0000' }} />
        <Typography variant="h6">{t('socials.youtubeFeed')}</Typography>
        <Link 
          href="https://www.youtube.com/@juangunner4" 
          target="_blank" 
          rel="noopener noreferrer"
          sx={{ color: '#d32f2f', fontWeight: 600 }}
          underline="none"
        >
          @juangunner4
        </Link>
        
        <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
          {t('socials.youtubeVisit')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default YoutubeFeed;
