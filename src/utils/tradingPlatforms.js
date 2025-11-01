export const TRADE_CATEGORIES = ['invest', 'trade'];

export const tradingPlatforms = {
  invest: [
    {
      id: 'webull',
      link: 'https://a.webull.com/NMixfRYZu7bzStLzxT',
      faviconDomain: 'webull.com',
      tags: ['Tag TBD'],
    },
    {
      id: 'cashapp',
      link: 'https://cash.app/app/BWSDDQZ',
      faviconDomain: 'cash.app',
      tags: ['Tag TBD'],
    },
    {
      id: 'sofi',
      link: 'https://www.sofi.com/invite/money?gcp=3972bc11-fd65-4573-8eca-5afb3831d790&isAliasGcp=false',
      faviconDomain: 'sofi.com',
      tags: ['Tag TBD'],
    },
  ],
  trade: [
    {
      id: 'okx',
      link: 'https://t.co/bgPKR6NG0R',
      faviconDomain: 'okx.com',
      tags: ['Tag TBD'],
    },
    {
      id: 'ourbit',
      link: 'https://t.co/bVED6Lt670',
      faviconDomain: 'ourbit.com',
      tags: ['Tag TBD'],
    },
    {
      id: 'moonshot',
      link: 'https://moonshot.com?ref=YOVb1F',
      faviconDomain: 'moonshot.com',
      tags: ['Memecoins', 'Referral Bonus'],
    },
    {
      id: 'aster',
      link: 'https://t.co/2Vp8ELVY5W',
      faviconDomain: 'asterdex.com',
      tags: ['Tag TBD'],
    },
    {
      id: 'gemini',
      link: 'https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=epgwn2epa',
      faviconDomain: 'gemini.com',
      tags: ['Tag TBD'],
    },
    {
      id: 'coinbase',
      link: 'https://coinbase.onelink.me/2ysS/rx5ndund?src=ios-link',
      faviconDomain: 'coinbase.com',
      tags: ['Tag TBD'],
    },
    {
      id: 'axiom',
      link: 'https://axiom.trade/@0x1juan',
      faviconDomain: 'axiom.trade',
      tags: ['Tag TBD'],
    },
    {
      id: 'backpack',
      link: 'https://backpack.exchange/refer/4tji5qyt',
      faviconDomain: 'backpack.exchange',
      tags: ['Tag TBD'],
    },
    {
      id: 'moby',
      link: 'https://invite.mobyscreener.com/pYqqj2AizXb',
      faviconDomain: 'mobyscreener.com',
      tags: ['Research', 'Analytics'],
    },
    {
      id: 'drip',
      link: 'https://drip.market/?ref=juangunner4',
      faviconDomain: 'drip.market',
      tags: ['Tag TBD'],
    },
    {
      id: 'sns',
      link: 'https://www.sns.id?ref=juangunner4',
      faviconDomain: 'sns.id',
      tags: ['Tag TBD'],
    },
    {
      id: 'pyro',
      link: 'https://www.pyro.buzz/add-creator?ref=Juangunner4',
      faviconDomain: 'www.pyro.buzz',
      tags: ['Creator Network', 'Referral Hub'],
    },
    {
      id: 'footballfun',
      link: 'https://pro.football.fun/login/?referral_code=UGCIJDHWTGL',
      faviconDomain: 'football.fun',
      tags: ['Football', 'Player Cards'],
    },
    {
      id: 'cflfun',
      link: 'https://preseason.cfl.fun/?ref=YKV71NH',
      faviconDomain: 'cfl.fun',
      tags: ['Fantasy League', 'Crypto'],
    },
  ],
};

export const getTradingPlatformsForCategory = (category) => tradingPlatforms[category] || [];

export const getRandomTradingPlatformForCategory = (category, randomFn = Math.random) => {
  const platforms = getTradingPlatformsForCategory(category);
  if (!platforms.length) {
    return null;
  }
  const randomIndex = Math.floor(randomFn() * platforms.length);
  return { ...platforms[randomIndex], category };
};

export const getRandomTradingPlatformForProfile = (isWeb3, randomFn = Math.random) => {
  const category = isWeb3 ? 'trade' : 'invest';
  return getRandomTradingPlatformForCategory(category, randomFn);
};

export default tradingPlatforms;
