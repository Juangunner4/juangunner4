import React, { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import '../styles/Shop.css';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../ProfileContext';

const defaultFilters = {
  category: 'all',
  priceType: 'all',
  paymentType: 'all',
};

const Shop = () => {
  const { t } = useTranslation();
  const { isWeb3 } = useProfile();
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [checkoutStatus, setCheckoutStatus] = useState('idle');

  const availableFilters = useMemo(
    () => ({
      category: [
        { value: 'all', label: t('shop.filters.allCategories') },
        { value: 'merch', label: t('shop.filters.merch') },
        { value: 'digital', label: t('shop.filters.digital') },
        { value: 'coaching', label: t('shop.filters.coaching') },
      ],
      priceType: [
        { value: 'all', label: t('shop.filters.anyPrice') },
        { value: 'fixed', label: t('shop.filters.fixed') },
        { value: 'subscription', label: t('shop.filters.subscription') },
      ],
      paymentType: [
        { value: 'all', label: t('shop.filters.anyPayment') },
        { value: 'square', label: t('shop.filters.square') },
        { value: 'crypto', label: t('shop.filters.crypto') },
      ],
    }),
    [t]
  );

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await axios.get('/api/shop/items', {
        params: {
          category: filters.category !== 'all' ? filters.category : undefined,
          priceType: filters.priceType !== 'all' ? filters.priceType : undefined,
          paymentType: filters.paymentType !== 'all' ? filters.paymentType : undefined,
        },
      });
      setItems(data.items || []);
    } catch (err) {
      console.error('Failed to load shop items', err);
      setError(t('shop.loadError'));
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [filters.category, filters.paymentType, filters.priceType, t]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory =
        filters.category === 'all' || item.category === filters.category;
      const matchesPriceType =
        filters.priceType === 'all' || item.priceType === filters.priceType;
      const matchesPayment =
        filters.paymentType === 'all' || (item.paymentTypes || []).includes(filters.paymentType);
      return matchesCategory && matchesPriceType && matchesPayment;
    });
  }, [filters.category, filters.paymentType, filters.priceType, items]);

  const handleCheckout = async (item) => {
    setCheckoutStatus('pending');
    try {
      const { data } = await axios.post('/api/shop/checkout', {
        lineItems: [
          {
            name: item.name,
            quantity: '1',
            basePriceMoney: {
              amount: Math.round(Number(item.price?.amount || item.price || 0) * 100),
              currency: item.price?.currency || 'USD',
            },
          },
        ],
        note: item.description,
        redirectUrl: window.location.href,
      });

      if (data?.paymentLink?.url) {
        window.open(data.paymentLink.url, '_blank', 'noopener');
        setCheckoutStatus('success');
      } else {
        setCheckoutStatus('idle');
      }
    } catch (err) {
      console.error('Checkout failed', err);
      setCheckoutStatus('error');
    }
  };

  return (
    <div className="page-wrapper shop-wrapper">
      <div className="page-hero">
        <h1>{t('shop.heading')}</h1>
        <p>{isWeb3 ? t('shop.subheadingWeb3') : t('shop.subheading')}</p>
      </div>

      <div className="shop-filters">
        {Object.keys(availableFilters).map((filterKey) => (
          <div className="filter-group" key={filterKey}>
            <label htmlFor={filterKey}>{t(`shop.filterLabels.${filterKey}`)}</label>
            <select
              id={filterKey}
              value={filters[filterKey]}
              onChange={(e) => handleFilterChange(filterKey, e.target.value)}
            >
              {availableFilters[filterKey].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {error && <div className="shop-message error">{error}</div>}
      {checkoutStatus === 'error' && <div className="shop-message error">{t('shop.checkoutError')}</div>}
      {checkoutStatus === 'success' && (
        <div className="shop-message success">{t('shop.checkoutSuccess')}</div>
      )}

      {loading ? (
        <div className="page-grid">
          {[...Array(3)].map((_, index) => (
            <div className="page-card shop-card skeleton" key={index}>
              <div className="skeleton-line short" />
              <div className="skeleton-line" />
              <div className="skeleton-line" />
            </div>
          ))}
        </div>
      ) : (
        <div className="page-grid">
          {filteredItems.map((item) => (
            <div key={item._id || item.name} className="page-card shop-card">
              <div className="shop-card-header">
                <span className="shop-badge">{item.category}</span>
                <span className="shop-price">
                  {t('shop.priceLabel', {
                    price: item.price?.amount || item.price,
                    currency: item.price?.currency || 'USD',
                  })}
                </span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <div className="shop-meta">
                <span>{t(`shop.priceTypes.${item.priceType}`)}</span>
                <span>
                  {t('shop.paymentTypesLabel', {
                    methods: (item.paymentTypes || []).join(', '),
                  })}
                </span>
              </div>

              <div className="shop-actions">
                <button type="button" className="cta-button" onClick={() => handleCheckout(item)}>
                  {t('shop.squareCta')}
                </button>
                <button type="button" className="secondary-button">
                  {t('shop.cryptoCta')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredItems.length === 0 && (
        <div className="shop-message info">{t('shop.empty')}</div>
      )}
    </div>
  );
};

export default Shop;
