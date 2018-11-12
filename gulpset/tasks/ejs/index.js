const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('ejs', () => gulpset.tasks.ejs());

gulpset.confs.ejs = {
  src: [gulpset.paths.src + '**/!(_)*.ejs'],
  dest: gulpset.paths.dest,
  data: {},
  options: {
    root: process.cwd() + '/src'
  },
  settings: {
    ext: '.html'
  }
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const ejs = require('gulp-ejs');
const changed = require('gulp-changed');
const beautify = require('gulp-jsbeautifier');

gulpset.tasks.ejs = (data, options, settings, conf) => {
  data = data || gulpset.confs.ejs.data || {};
  options = options || gulpset.confs.ejs.options || {};
  settings = settings || gulpset.confs.ejs.settings || {};
  conf = conf || gulpset.confs.ejs || {};

  return gulp
    .src(conf.src)
    .pipe(plumber())
    .pipe(changed(conf.dest))
    .pipe(ejs(data, options, settings))
    .pipe(beautify({ indentSize: 2 }))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream());
};
