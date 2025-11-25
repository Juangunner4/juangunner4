import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Instagram } from '@mui/icons-material';
import { useProfile } from '../../ProfileContext';

const InstagramFeed = () => {
  const { isWeb3 } = useProfile();
  const handle = isWeb3 ? '0x1JuanGunner4' : 'juangunner4';
  
  useEffect(() => {
    // Load Instagram embed script
    if (!document.querySelector('script[src="https://www.instagram.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.instagram.com/embed.js';
      script.async = true;
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process();
        }
      };
      document.body.appendChild(script);
    } else if (window.instgrm) {
      window.instgrm.Embeds.process();
    }
  }, [handle]);
  
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
        <Instagram sx={{ fontSize: 40, color: '#ff0000' }} />
        <Typography variant="h6">Follow me on Instagram</Typography>
        <Link 
          href={`https://www.instagram.com/${handle}`}
          target="_blank" 
          rel="noopener noreferrer"
          sx={{ color: '#d32f2f', fontWeight: 600 }}
          underline="none"
        >
          @{handle}
        </Link>
        
        <Box 
          sx={{ 
            width: '100%', 
            maxWidth: '540px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <blockquote 
            className="instagram-media" 
            data-instgrm-permalink={`https://www.instagram.com/${handle}/`}
            data-instgrm-version="14"
            style={{
              background: '#FFF',
              border: 0,
              borderRadius: '3px',
              boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
              margin: '1px',
              maxWidth: '540px',
              minWidth: '326px',
              padding: 0,
              width: 'calc(100% - 2px)'
            }}
          >
            <div style={{ padding: '16px' }}>
              <a 
                href={`https://www.instagram.com/${handle}/`}
                style={{
                  background: '#FFFFFF',
                  lineHeight: 0,
                  padding: '0 0',
                  textAlign: 'center',
                  textDecoration: 'none',
                  width: '100%'
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                View @{handle} on Instagram
              </a>
            </div>
          </blockquote>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InstagramFeed;
