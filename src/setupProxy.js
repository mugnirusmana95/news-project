const { createProxyMiddleware } = require('http-proxy-middleware');
require("dotenv").config()

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://proxy-2r5oafcrs-ade-mugni-rusmanas-projects-730222c4.vercel.app',
      changeOrigin: true,
    })
  );
};