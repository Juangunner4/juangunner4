import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { LocalFireDepartment } from '@mui/icons-material';

const PumpFunFeed = () => (
  <Card sx={{ my: 2, width: '100%' }}>
    <CardContent sx={{ textAlign: 'center' }}>
      <LocalFireDepartment sx={{ fontSize: 40, color: '#ff9100' }} />
      <Typography variant="h6">Watch me on Pump.fun</Typography>
      <Link
        href="https://pump.fun/coin/5JdqZmKZnn35F7ER6J3f7Zjx84DEN4u7PKtxuTxipump"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: '#d32f2f', fontWeight: 600 }}
        underline="none"
      >
        pump.fun
      </Link>
    </CardContent>
  </Card>
);

export default PumpFunFeed;
