const PROFILE_PATH_PATTERN = /^\/profile\/(web2|web3)/;

export const getProfileBasePath = (isWeb3) => `/profile/${isWeb3 ? 'web3' : 'web2'}`;

export const buildProfileAwarePath = (pathname, targetIsWeb3) => {
  const basePath = getProfileBasePath(targetIsWeb3);
  if (typeof pathname !== 'string' || pathname.length === 0) {
    return basePath;
  }

  if (!PROFILE_PATH_PATTERN.test(pathname)) {
    return basePath;
  }

  return pathname.replace(PROFILE_PATH_PATTERN, basePath);
};

export default PROFILE_PATH_PATTERN;
