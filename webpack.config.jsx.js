const devConfig = require('./webpack.config');

module.exports = {
  ...devConfig,
  // devtool: 'nosources-source-map',
  entry: null,
  output: {
    library: 'module.exports',
    libraryTarget: 'assign'
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  externals: {
    react: 'GLOBAL_REACT',
    'react-dom': 'GLOBAL_REACTDOM'
  }
};
