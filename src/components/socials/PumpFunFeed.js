import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { LocalFireDepartment, Medication } from '@mui/icons-material';

const PumpFunFeed = () => (
  <Card sx={{ my: 2, width: '100%' }}>
    <CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
        <LocalFireDepartment sx={{ fontSize: 40, color: '#ff9100' }} />
        <Typography variant="h6">Watch me on Pump.fun</Typography>
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
            Stream Token Overview
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Dive into the latest stats for my stream token and check back soon for live updates.
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Token Link:{' '}
          <Link
            href="https://pump.fun/coin/5JdqZmKZnn35F7ER6J3f7Zjx84DEN4u7PKtxuTxipump"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontWeight: 600 }}
            underline="none"
          >
            View on pump.fun
          </Link>
        </Typography>
        <Grid container spacing={2}>
          {[
            { label: 'Market Cap', value: '--' },
            { label: 'Holders', value: '--' },
            { label: '24h Change', value: '--' },
            { label: '24h Volume', value: '--' }
          ].map(({ label, value }) => (
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

export default PumpFunFeed;
