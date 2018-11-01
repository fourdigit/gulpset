const gulp = require('gulp');
const logger = require('gulplog');
const gutil = require('gulp-util');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const beautify = require('gulp-jsbeautifier');

const path = require('path');
const named = require('vinyl-named');
const through = require('through2');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

const PLUGIN_NAME = 'gulp-jsx-render';
const gulpset = require('./../../gulpset');
const webpackConfig = require('../../../webpack.config');
const webpackConfigProd = require('../../../webpack.config.prod');


// @verbose
gulpset.gulp.task('jsx-static', () => gulpset.tasks.jsx());

gulpset.confs.jsx = {
  src: `${gulpset.paths.src}jsx/pages/**/*.jsx`,
  dest: gulpset.paths.dest,
  data: {},
  options: {
    root: process.cwd() + '/src'
  }
};

gulpset.tasks.jsx = (conf, cb, minify = false) => {
  conf = conf || gulpset.confs.jsx || {};

  let firstBuildReady = false;

  const done = function (err, stats) {
    if (!firstBuildReady && cb) {
      cb();
    }
    firstBuildReady = true;

    if (err) {
      // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
      return; // emit('error', err) in webpack-stream
    }

    // https://webpack.js.org/api/node/#stats-object
    // https://webpack.js.org/configuration/stats/
    logger[stats.hasErrors() ? 'error' : 'info'](stats.toString({
        chunks: false, // Makes the build much quieter
        modules: false,
        colors: true, // Shows colors in the console
        // Add errors
        errors: true,
        // Add details to errors (like resolving log)
        // errorDetails: true,
        entrypoints: true
      }));

    if (typeof gulpset.reload === 'function') {
      gulpset.reload();
    }
  };

  delete webpackConfig.entry;

  webpackConfig.output = { libraryTarget: 'commonjs2' };
  webpackConfig.resolve = webpackConfig.resolve || {};
  webpackConfig.resolve.extensions = webpackConfig.resolve.extensions || [];
  const extensions = webpackConfig.resolve.extensions
  if(extensions.indexOf('jsx') === -1) extensions.push('.jsx');
  if(extensions.indexOf('js') === -1) extensions.push('.js');

  return gulp
    .src(conf.src)
    .pipe(plumber())
    .pipe(changed(conf.dest))
    .pipe(named(function(file) {
        const dir = path.dirname(file.path);
        const name = path.basename(file.path, path.extname(file.path));
        const dest = path.join(dir, name).replace(conf.options.root, '');
        // logger.info(dest);
        return dest;
      }))
    .pipe(webpackStream(!minify ? webpackConfig : webpackConfigProd, webpack, done))
    .pipe(through.obj(function(file, enc, cb) {
        try {
          const jsContent = file.contents.toString(enc);
          // console.log(file.path, jsContent);

          //http://fredkschott.com/post/2014/06/require-and-the-module-system/
          const mod = new module.constructor();
          mod._compile(jsContent, file.path);

          const component = mod.exports;
          // console.log(Object.keys(component));
          // console.log(component);

          const element = React.createElement(component.default || component, {});
          if (file.isBuffer()) {
            const html = ReactDOMServer.renderToStaticMarkup(element);
            file.contents = Buffer.from(html, 'utf8');
          } else if (file.isStream()) {
            file.contents = ReactDOMServer.renderToStaticNodeStream(element);
          }
        } catch (err) {
          this.emit('error', new gutil.PluginError(PLUGIN_NAME, err, { fileName: file.path }));
        }
        cb(null, file);
      }))
    .pipe(rename({ extname: '.html' }))
    .pipe(beautify({ indentSize: 2 }))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream());
};

