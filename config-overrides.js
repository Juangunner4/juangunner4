module.exports = function override(config) {
  config.resolve = config.resolve || {};
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    vm: require.resolve("vm-browserify"),
  };

  // Suppress source-map-loader warnings for third-party libraries
  config.module = config.module || {};
  config.module.rules = config.module.rules || [];
  
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: 'pre',
    use: ['source-map-loader'],
    exclude: [
      /node_modules\/@reown/,
      /node_modules\/superstruct/,
    ],
  });

  // Ignore missing source map warnings
  config.ignoreWarnings = [
    /Failed to parse source map/,
    /source-map-loader/,
  ];

  return config;
};
