const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('pug', () => gulpset.tasks.pug());

gulpset.confs.pug = {
  entry: `${gulpset.paths.src}**/*.pug`,
  src: `${gulpset.paths.src}**/!(_)*.pug`,
  dest: gulpset.paths.dest,
  data: {}
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const changed = require('gulp-changed');
const beautify = require('gulp-jsbeautifier');

gulpset.tasks.pug = (data, conf) => {
  data = data || gulpset.confs.pug.data || {};
  conf = conf || gulpset.confs.pug || {};

  return gulp
    .src(conf.src)
    .pipe(plumber())
    .pipe(changed(conf.dest))
    .pipe(pug({ pretty: true }))
    .pipe(beautify({ indentSize: 2 }))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream());
};
