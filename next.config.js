const path = require('path');

const nextConfig = {
  pageExtensions: ['ts', 'tsx'],
  webpack(config) {
    config.resolve.alias['@app'] = path.join(__dirname, 'app');
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/Page',
      },
    ];
  },
};

module.exports = nextConfig;
