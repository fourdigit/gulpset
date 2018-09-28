const path = require('path');
const NODE_ENV = process.env.NODE_ENV ? 'production' : 'development';

module.exports = {
  mode: NODE_ENV,
  context: __dirname + '/src',
  entry: {
    app: './assets/js/app.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname + '/build/assets/js/'),
    publicPath: '/assets/js/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        ]
      }
    ]
  }
};
