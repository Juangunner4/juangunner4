export const getFaviconUrl = (url, faviconDomain = null) => {
  try {
    let domain;
    if (faviconDomain) {
      domain = faviconDomain;
    } else {
      const urlObj = new URL(url);
      domain = urlObj.hostname;
    }
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch (error) {
    return null;
  }
};

export default getFaviconUrl;
