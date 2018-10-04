module.exports = {
  mode: 'development',
  context: __dirname + '/src',
  watch: true,
  entry: {
    app: './assets/js/app.js'
  },
  output: {
    filename: 'assets/js/[name].js'
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
              presets: [
                [
                  '@babel/preset-env',
                  {
                    loose: true
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  }
};
