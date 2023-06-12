const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/adyinet',
    createProxyMiddleware({
      target: 'https://adyinet.smartolt.com/api/onu/unconfigured_onus_for_olt/115',
      changeOrigin: true,
    })
  );
};