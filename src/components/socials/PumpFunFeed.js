import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { LocalFireDepartment, Medication } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { fetchMarketStats } from '../../market';

const JUAN_TOKEN_ADDRESS = '5JdqZmKZnn35F7ER6J3f7Zjx84DEN4u7PKtxuTxipump';

const formatCurrency = (value) => {
  if (value === null || value === undefined) return '--';

  const num = Number(value);
  if (!Number.isFinite(num)) return '--';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: num >= 100 ? 0 : 2
  }).format(num);
};

const formatPercent = (value) => {
  if (value === null || value === undefined) return '--';

  const num = Number(value);
  if (!Number.isFinite(num)) return '--';

  const fractionDigits = Math.abs(num) >= 10 ? 1 : 2;
  const formatted = num.toFixed(fractionDigits);
  const prefix = num > 0 ? '+' : '';
  return `${prefix}${formatted}%`;
};

const PumpFunFeed = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    marketCap: null,
    priceChange24h: null,
    volume24h: null,
    ticker: null
  });

  useEffect(() => {
    let isActive = true;

    fetchMarketStats(JUAN_TOKEN_ADDRESS)
      .then((data) => {
        if (!isActive) return;
        setStats(data);
      })
      .catch(() => {
        if (isActive) {
          setStats((previous) => ({ ...previous }));
        }
      });

    return () => {
      isActive = false;
    };
  }, []);

  const metrics = [
    { label: t('socials.pumpfunMarketCap'), value: formatCurrency(stats.marketCap) },
    { label: t('socials.pumpfunTicker'), value: stats.ticker ?? '--' },
    { label: t('socials.pumpfun24hChange'), value: formatPercent(stats.priceChange24h) },
    { label: t('socials.pumpfun24hVolume'), value: formatCurrency(stats.volume24h) }
  ];

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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <LocalFireDepartment sx={{ fontSize: 40, color: '#ff9100' }} />
          <Typography variant="h6">{t('socials.pumpfunFeed')}</Typography>
        </Box>
        <Link
          href="https://pump.fun/profile/juangunner4"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: '#d32f2f', fontWeight: 600 }}
          underline="none"
        >
          pump.fun/juangunner4
        </Link>

        <Divider sx={{ my: 1 }} />

        <Box sx={{ textAlign: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Medication sx={{ fontSize: 28, color: '#6a1b9a' }} />
            <Typography variant="subtitle1" fontWeight="bold">
              {t('socials.pumpfunTokenOverview')}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('socials.pumpfunDescription')}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {t('socials.pumpfunTokenLink')}{' '}
            <Link
              href="https://pump.fun/coin/5JdqZmKZnn35F7ER6J3f7Zjx84DEN4u7PKtxuTxipump"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 600 }}
              underline="none"
            >
              {t('socials.pumpfunView')}
            </Link>
          </Typography>
          <Grid container spacing={2}>
            {metrics.map(({ label, value }) => (
              <Grid item xs={12} sm={6} key={label}>
                <Typography variant="overline" display="block" color="text.secondary">
                  {label}
                </Typography>
                <Typography variant="h6">{value}</Typography>
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PumpFunFeed;
