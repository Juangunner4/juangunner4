const express = require('express');
const { Client } = require('square');
const { randomUUID } = require('crypto');
const ShopItem = require('../models/ShopItem');

const router = express.Router();

const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;
const squareEnvironment = process.env.SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox';

const squareClient = SQUARE_ACCESS_TOKEN
  ? new Client({
      accessToken: SQUARE_ACCESS_TOKEN,
      environment: squareEnvironment,
    })
  : null;

const fallbackItems = [
  {
    name: 'Gameday Scarf',
    description: 'Premium match-day scarf with club colors and a woven crest.',
    category: 'merch',
    priceType: 'fixed',
    price: { amount: 35, currency: 'USD' },
    paymentTypes: ['square', 'crypto'],
  },
  {
    name: 'Content Lab Membership',
    description: 'Monthly access to creator templates, editing presets, and livestream office hours.',
    category: 'digital',
    priceType: 'subscription',
    price: { amount: 15, currency: 'USD' },
    paymentTypes: ['square'],
  },
  {
    name: '1:1 Strategy Session',
    description: 'A 45-minute strategy session on football training, coding career moves, or trading routines.',
    category: 'coaching',
    priceType: 'fixed',
    price: { amount: 120, currency: 'USD' },
    paymentTypes: ['square', 'crypto'],
  },
];

router.get('/items', async (req, res) => {
  try {
    const { category, priceType, paymentType } = req.query;
    const query = { isAvailable: true };

    if (category) query.category = category;
    if (priceType) query.priceType = priceType;
    if (paymentType) query.paymentTypes = { $in: [paymentType] };

    const items = await ShopItem.find(query).sort({ createdAt: -1 }).lean();

    if (!items.length) {
      const filteredFallback = fallbackItems.filter((item) => {
        const matchesCategory = !category || item.category === category;
        const matchesPriceType = !priceType || item.priceType === priceType;
        const matchesPayment = !paymentType || item.paymentTypes.includes(paymentType);
        return matchesCategory && matchesPriceType && matchesPayment;
      });
      return res.json({ items: filteredFallback });
    }

    return res.json({ items });
  } catch (err) {
    console.error('Error fetching shop items', err);
    return res.status(500).json({ error: 'Unable to fetch shop items' });
  }
});

router.post('/items', async (req, res) => {
  try {
    const { name, description, category, priceType, price, paymentTypes, tags, mediaUrl } = req.body;
    const item = await ShopItem.create({
      name,
      description,
      category,
      priceType,
      price,
      paymentTypes,
      tags,
      mediaUrl,
    });
    return res.status(201).json({ item });
  } catch (err) {
    console.error('Error creating shop item', err);
    return res.status(400).json({ error: 'Unable to create shop item', details: err.message });
  }
});

router.post('/checkout', async (req, res) => {
  if (!squareClient) {
    return res.status(503).json({ error: 'Square is not configured yet.' });
  }

  if (!SQUARE_LOCATION_ID) {
    return res.status(400).json({ error: 'Missing Square location ID.' });
  }

  const { lineItems, redirectUrl, note } = req.body;

  if (!Array.isArray(lineItems) || !lineItems.length) {
    return res.status(400).json({ error: 'At least one line item is required.' });
  }

  try {
    const response = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: randomUUID(),
      order: {
        locationId: SQUARE_LOCATION_ID,
        lineItems,
      },
      checkoutOptions: {
        redirectUrl,
        askForShippingAddress: true,
      },
      description: note,
    });

    return res.json({ paymentLink: response.result.paymentLink });
  } catch (err) {
    console.error('Error creating Square payment link', err);
    const message = err?.body?.errors?.[0]?.detail || 'Unable to initialize Square checkout.';
    return res.status(502).json({ error: message });
  }
});

module.exports = router;
