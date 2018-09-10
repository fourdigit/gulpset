const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('stylint', () => gulpset.tasks.stylint());

gulpset.confs.stylint = {
  src: [`${gulpset.paths.src}**/*.styl`]
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const stylint = require('gulp-stylint');

gulpset.tasks.stylint = conf => {
  const config = conf || gulpset.confs.stylint || {};
  return gulp
    .src(config.src)
    .pipe(plumber())
    .pipe(stylint())
    .pipe(stylint.reporter());
};
