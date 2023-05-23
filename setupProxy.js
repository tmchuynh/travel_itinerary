const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/wikipedia-api',
    createProxyMiddleware({
      target: 'https://en.wikipedia.org',
      changeOrigin: true,
      pathRewrite: {
        '^/wikipedia-api': '/w/api.php',
      },
    })
  );
};
