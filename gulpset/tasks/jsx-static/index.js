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

const gulpset = require('./../../gulpset');
const webpackConfig = require('../../../webpack.config.jsx');
const PLUGIN_NAME = 'jsx-static-render';

global.GLOBAL_REACT = React;
global.GLOBAL_REACTDOM = require('react-dom');

// @verbose
gulpset.gulp.task('jsx-static', cb => gulpset.tasks.jsx(cb));

gulpset.gulp.task('jsx-static:prod', cb =>
  gulpset.tasks.jsx(cb, {
    ...gulpset.confs.jsx,
    prod: true
  })
);

gulpset.confs.jsx = {
  src: `${gulpset.paths.src}**/*.html.tsx`,
  dest: gulpset.paths.dest,
  options: {
    root: process.cwd() + '/src'
  },
  prod: false
};

gulpset.tasks.jsx = (cb, conf) => {
  conf = conf || gulpset.confs.jsx || {};

  let runtimeWebpackConfig = { ...webpackConfig };
  if (conf.prod) {
    runtimeWebpackConfig.mode = 'production';
    runtimeWebpackConfig.watch = false;
  }

  let firstBuildReady = false;

  const done = function(err, stats) {
    if (!firstBuildReady && typeof cb === 'function') {
      cb();
    }
    firstBuildReady = true;

    if (err) {
      // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
      return; // emit('error', err) in webpack-stream
    }

    // https://webpack.js.org/api/node/#stats-object
    // https://webpack.js.org/configuration/stats/
    logger[stats.hasErrors() ? 'error' : 'info'](
      stats.toString({
        chunks: false, // Makes the build much quieter
        modules: false,
        colors: true, // Shows colors in the console
        errors: true
        // errorDetails: true,
      })
    );

    if (typeof gulpset.reload === 'function') {
      gulpset.reload();
    }
  };

  return gulp
    .src(conf.src)
    .pipe(plumber())
    .pipe(changed(conf.dest))
    .pipe(
      named(function(file) {
        const dir = path.dirname(file.path);
        const name = path.basename(file.path, path.extname(file.path));
        const dest = path.join(dir, name).replace(conf.options.root, '');
        return dest;
      })
    )
    .pipe(webpackStream(runtimeWebpackConfig, webpack, done))
    .pipe(
      through.obj(function(file, enc, cb) {
        try {
          if (file.isStream()) {
            throw 'Stream support is not implemented!';
          }

          const jsContent = file.contents.toString(enc);
          // console.log(jsContent);
          //http://fredkschott.com/post/2014/06/require-and-the-module-system/
          const mod = new module.constructor();
          mod._compile(jsContent, file.path);

          const component = mod.exports;
          const element = React.createElement(component.default || component, {});
          const html = ReactDOMServer.renderToStaticMarkup(element);
          file.contents = Buffer.from(html, 'utf8');
        } catch (err) {
          this.emit('error', new gutil.PluginError(PLUGIN_NAME, err, { fileName: file.path }));
        }
        cb(null, file);
      })
    )
    .pipe(rename({ extname: '' }))
    .pipe(beautify({ indentSize: 2 }))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream());
};
