const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  async middleware() {
    const proxy = createProxyMiddleware({
      target: 'https://maps.googleapis.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/googleplaces': '/maps/api/place',
      },
    });

    return {
      '/api/googleplaces': proxy,
    };
  },
};
