const path = require('path');
const NODE_ENV = process.env.NODE_ENV ? 'production' : 'development';

module.exports = {
  mode: NODE_ENV,
  context: __dirname + '/src',
  entry: {
    libs: './js/libs.es6',
    app: './js/app.es6'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname + '/build/assets/app/js/'),
    publicPath: '/assets/app/js/'
  },
  module: {
    rules: [
      {
        test: /\.es6$/,
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
