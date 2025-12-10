import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/Shop.css';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../ProfileContext';
import { getProfileBasePath } from '../utils/profileRouting';

const placeholderMedia = [
  'https://images.placeholders.dev/?width=960&height=540&text=Shop%20preview%201',
  'https://images.placeholders.dev/?width=960&height=540&text=Shop%20preview%202',
  'https://images.placeholders.dev/?width=960&height=540&text=Shop%20preview%203',
  'https://images.placeholders.dev/?width=960&height=540&text=Shop%20preview%204',
];

const placeholderItem = {
  sku: 'sku12355',
  name: 'Placeholder drop',
  description:
    'Example listing used while the shop inventory is being populated. Real items will appear soon.',
  price: { amount: 0, currency: 'USD' },
  priceType: 'fixed',
  category: 'merch',
  marketplace: 'site',
  listingUrl: 'https://juangunner4.com/profile/web2/shop/sku12355',
  paymentTypes: ['square', 'crypto'],
  tags: ['placeholder', 'coming-soon', 'example'],
  mediaUrls: placeholderMedia,
};

const formatItem = (incoming) => {
  const mediaUrls = Array.isArray(incoming.mediaUrls) && incoming.mediaUrls.length
    ? incoming.mediaUrls.slice(0, 4)
    : placeholderMedia;

  return {
    ...placeholderItem,
    ...incoming,
    sku: incoming.sku || placeholderItem.sku,
    marketplace: incoming.marketplace || 'site',
    mediaUrls,
    tags: Array.isArray(incoming.tags) && incoming.tags.length ? incoming.tags : placeholderItem.tags,
  };
};

const ShopItem = () => {
  const { sku } = useParams();
  const { t } = useTranslation();
  const { isWeb3 } = useProfile();
  const basePath = getProfileBasePath(isWeb3);
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState('loading');
  const [checkoutStatus, setCheckoutStatus] = useState('idle');

  useEffect(() => {
    const fetchItem = async () => {
      setStatus('loading');
      try {
        const { data } = await axios.get(`/api/shop/items/${sku}`);
        setItem(formatItem(data.item || {}));
        setStatus('ready');
      } catch (err) {
        console.error('Unable to load shop item', err);
        if (sku === placeholderItem.sku) {
          setItem(formatItem(placeholderItem));
          setStatus('ready');
          return;
        }
        setStatus('error');
      }
    };

    fetchItem();
  }, [sku]);

  const isSiteMarketplace = useMemo(() => (item?.marketplace || 'site') === 'site', [item?.marketplace]);

  const handleCheckout = async () => {
    if (!item) return;

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

  if (status === 'loading') {
    return (
      <div className="page-wrapper shop-wrapper">
        <div className="page-hero">
          <h1>{t('shop.item.loadingTitle')}</h1>
          <p>{t('shop.item.loadingBody')}</p>
        </div>
        <div className="page-card skeleton">
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      </div>
    );
  }

  if (status === 'error' || !item) {
    return (
      <div className="page-wrapper shop-wrapper">
        <div className="page-hero">
          <h1>{t('shop.item.notFoundTitle')}</h1>
          <p>{t('shop.item.notFoundBody')}</p>
        </div>
        <Link className="secondary-button" to={`${basePath}/shop`}>
          {t('shop.item.backToShop')}
        </Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper shop-wrapper">
      <div className="shop-breadcrumbs">
        <Link to={`${basePath}/shop`}>{t('shop.item.backToShop')}</Link>
        <span>/</span>
        <span>{item.sku}</span>
      </div>
      <div className="page-hero">
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </div>

      <div className="shop-detail">
        <div className="shop-detail-card">
          <div className="shop-media">
            <img src={item.mediaUrls?.[0] || placeholderMedia[0]} alt={`${item.name} preview`} loading="lazy" />
          </div>
          <div className="shop-gallery">
            {item.mediaUrls?.map((media, index) => (
              <img key={media + index} src={media} alt={`${item.name} preview ${index + 1}`} loading="lazy" />
            ))}
          </div>
        </div>

        <div className="shop-detail-card">
          <div className="shop-card-header">
            <span className="shop-badge">{item.category}</span>
            {!isSiteMarketplace && (
              <span className="shop-badge marketplace">
                {t(`shop.marketplaceBadge.${item.marketplace}`, {
                  defaultValue: t('shop.marketplaceNames.site'),
                })}
              </span>
            )}
            <span className="shop-price">
              {t('shop.priceLabel', {
                price: item.price?.amount || item.price,
                currency: item.price?.currency || 'USD',
              })}
            </span>
          </div>

          <div className="shop-item-meta">
            <span>{t(`shop.priceTypes.${item.priceType}`)}</span>
            <span>
              {t('shop.paymentTypesLabel', {
                methods: (item.paymentTypes || []).join(', '),
              })}
            </span>
            {item.tags?.length ? (
              <div className="shop-tags">
                {item.tags.map((tag) => (
                  <span className="shop-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {item.marketplace !== 'site' && item.listingUrl ? (
              <p>{t('shop.item.marketplaceNote')}</p>
            ) : (
              <p>{t('shop.item.placeholderNote')}</p>
            )}
          </div>

          <div className="shop-actions">
            {isSiteMarketplace ? (
              <>
                <button type="button" className="cta-button" onClick={handleCheckout}>
                  {t('shop.squareCta')}
                </button>
                <button type="button" className="secondary-button">
                  {t('shop.cryptoCta')}
                </button>
                {item.listingUrl && (
                  <a className="secondary-button" href={item.listingUrl} target="_blank" rel="noreferrer">
                    {t('shop.viewListing')}
                  </a>
                )}
              </>
            ) : (
              <a
                className="cta-button"
                href={item.listingUrl || undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={!item.listingUrl}
              >
                {t('shop.marketplaceCta.default', { marketplace: t(`shop.marketplaceNames.${item.marketplace}`) })}
              </a>
            )}
          </div>

          {checkoutStatus === 'error' && <div className="shop-message error">{t('shop.checkoutError')}</div>}
          {checkoutStatus === 'success' && (
            <div className="shop-message success">{t('shop.checkoutSuccess')}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopItem;
