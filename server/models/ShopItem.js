const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
  },
  { _id: false }
);

const ShopItemSchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['merch', 'digital', 'coaching', 'collectibles'],
      default: 'merch',
    },
    marketplace: {
      type: String,
      enum: ['site', 'ebay', 'etsy', 'tcg'],
      default: 'site',
    },
    priceType: {
      type: String,
      enum: ['fixed', 'subscription'],
      default: 'fixed',
    },
    price: {
      type: PriceSchema,
      required: true,
    },
    paymentTypes: {
      type: [String],
      default: ['square', 'crypto'],
    },
    mediaUrls: {
      type: [String],
      default: [],
      validate: {
        validator: (value) => !Array.isArray(value) || value.length <= 4,
        message: 'A maximum of 4 images is allowed per item.',
      },
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    listingUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ShopItem', ShopItemSchema);
