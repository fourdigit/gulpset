const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('sasslint', () => gulpset.tasks.sasslint());

gulpset.confs.sasslint = {
  config: './.sass-lint.yml',
  src: [gulpset.paths.src + '**/*.{scss,sass}']
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sasslint = require('gulp-sass-lint');

gulpset.tasks.sasslint = conf => {
  conf = conf || gulpset.confs.sasslint || {};
  return gulp
    .src(conf.src)
    .pipe(plumber())
    .pipe(sasslint({ config: conf.config }))
    .pipe(sasslint.format());
};
