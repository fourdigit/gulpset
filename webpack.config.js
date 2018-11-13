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
        test: /\.jsx?$/,
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
                ],
                '@babel/preset-react'
              ]
            }
          }
        ]
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' }
    ]
  }
};
