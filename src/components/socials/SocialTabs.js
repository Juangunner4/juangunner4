
import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useTranslation } from 'react-i18next';

const SocialTabs = ({ value, setValue }) => {
  const { t } = useTranslation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box 
      sx={{ 
        maxWidth: { xs: '100%', sm: 600 }, 
        mx: 'auto', 
        mt: { xs: 2, sm: 4 }, 
        borderRadius: 3, 
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.12)', 
        background: '#fff',
        p: { xs: 1, sm: 2 }
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          centered
          aria-label="social media tabs"
          sx={{
            '& .MuiTab-root': {
              color: '#333333',
              fontWeight: 600,
            },
            '& .Mui-selected': {
              color: '#000000 !important',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#d32f2f', // red color for indicator
            }
          }}
        >
          <Tab label={t('socials.x')} value="x" />
          <Tab label={t('socials.instagram')} value="instagram" />
          <Tab label={t('socials.twitch')} value="twitch" />
          <Tab label={t('socials.youtube')} value="youtube" />
        </Tabs>
      </Box>
      {/* Timeline will be rendered in Home.js, not here */}
    </Box>
  );
};
SocialTabs.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default SocialTabs;