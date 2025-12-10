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

const placeholderImages = [
  'https://images.placeholders.dev/?width=960&height=540&text=Shop%20preview%201',
  'https://images.placeholders.dev/?width=960&height=540&text=Shop%20preview%202',
  'https://images.placeholders.dev/?width=960&height=540&text=Shop%20preview%203',
  'https://images.placeholders.dev/?width=960&height=540&text=Shop%20preview%204',
];

const placeholderItem = {
  sku: 'sku12355',
  name: 'Placeholder drop',
  description:
    'This is an example shop item showing how marketplace listings, media, and tags render while inventory is added.',
  category: 'merch',
  priceType: 'fixed',
  marketplace: 'site',
  price: { amount: 0, currency: 'USD' },
  paymentTypes: ['square', 'crypto'],
  tags: ['placeholder', 'coming-soon', 'example'],
  listingUrl: 'https://juangunner4.com/profile/web2/shop/sku12355',
  mediaUrls: placeholderImages,
};

const sanitizeMediaUrls = (mediaUrls = []) =>
  (Array.isArray(mediaUrls) ? mediaUrls.slice(0, 4) : []).filter(Boolean);

const resolveMediaUrls = (mediaUrls = []) => {
  const sanitized = sanitizeMediaUrls(mediaUrls);
  return sanitized.length ? sanitized : placeholderImages;
};

router.get('/items', async (req, res) => {
  try {
    const { category, priceType } = req.query;
    const query = { isAvailable: true };

    if (category) query.category = category;
    if (priceType) query.priceType = priceType;

    const items = await ShopItem.find(query).sort({ createdAt: -1 }).lean();

    if (!items.length) {
      const matchesCategory = !category || placeholderItem.category === category;
      const matchesPriceType = !priceType || placeholderItem.priceType === priceType;

      if (!matchesCategory || !matchesPriceType) {
        return res.json({ items: [] });
      }

      return res.json({ items: [{ ...placeholderItem, mediaUrls: resolveMediaUrls(placeholderItem.mediaUrls) }] });
    }

    return res.json({ items: items.map((item) => ({ ...item, mediaUrls: resolveMediaUrls(item.mediaUrls) })) });
  } catch (err) {
    console.error('Error fetching shop items', err);
    return res.status(500).json({ error: 'Unable to fetch shop items' });
  }
});

router.get('/items/:sku', async (req, res) => {
  const { sku } = req.params;

  try {
    const item = await ShopItem.findOne({ sku }).lean();

    if (item) {
      return res.json({
        item: {
          ...item,
          mediaUrls: resolveMediaUrls(item.mediaUrls),
        },
      });
    }

    if (sku === placeholderItem.sku) {
      return res.json({ item: { ...placeholderItem, mediaUrls: resolveMediaUrls(placeholderItem.mediaUrls) } });
    }

    return res.status(404).json({ error: 'Shop item not found.' });
  } catch (err) {
    console.error('Error fetching shop item', err);
    return res.status(500).json({ error: 'Unable to fetch shop item' });
  }
});

router.post('/items', async (req, res) => {
  try {
    const {
      sku,
      name,
      description,
      category,
      priceType,
      price,
      paymentTypes,
      marketplace,
      listingUrl,
      tags,
      mediaUrls = [],
    } = req.body;
    const item = await ShopItem.create({
      sku,
      name,
      description,
      category,
      priceType,
      price,
      paymentTypes,
      marketplace,
      listingUrl,
      tags,
      mediaUrls: sanitizeMediaUrls(mediaUrls),
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
