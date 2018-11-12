const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('stylelint', () => gulpset.tasks.stylelint());

gulpset.confs.stylelint = {
  src: [gulpset.paths.src + '**/*.{scss,sass}']
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const stylelint = require('stylelint');
const postcss = require('gulp-postcss');
const reporter = require('postcss-reporter');

gulpset.tasks.stylelint = conf => {
  conf = conf || gulpset.confs.stylelint || {};
  return gulp
    .src(conf.src)
    .pipe(plumber())
    .pipe(postcss([stylelint(), reporter()]));
};
