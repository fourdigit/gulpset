module.exports = {
  modifyBundlerConfig: config => {
    config.resolve.extensions.push('.scss');
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    });

    return config;
  }
};
