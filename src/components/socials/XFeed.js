import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { X } from '@mui/icons-material';
import { useProfile } from '../../ProfileContext';
import { useTranslation } from 'react-i18next';

const XFeed = () => {
  const { isWeb3 } = useProfile();
  const { t } = useTranslation();
  const handle = isWeb3 ? '0x1JuanGunner4' : 'juangunner4';

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
        <X sx={{ fontSize: 40, color: '#000' }} />
        <Typography variant="h6">{t('socials.xFeed')}</Typography>
        <Link 
          href={`https://x.com/${handle}`}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#d32f2f', fontWeight: 600 }}
          underline="none"
        >
          @{handle}
        </Link>
        
        <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
          {t('socials.xVisit')}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default XFeed;
