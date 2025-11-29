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
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['merch', 'digital', 'coaching'],
      default: 'merch',
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
    isAvailable: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    mediaUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ShopItem', ShopItemSchema);
