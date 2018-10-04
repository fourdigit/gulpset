const devConfig = require('./webpack.config');

module.exports = {
  ...devConfig,
  watch: false,
  mode: 'production'
};
