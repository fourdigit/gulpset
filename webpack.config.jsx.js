const devConfig = require('./webpack.config');

module.exports = {
  ...devConfig,
  entry: null,
  output: { libraryTarget: 'commonjs2' },
  resolve: {
    extensions: ['.jsx', '.js']
  }
};
