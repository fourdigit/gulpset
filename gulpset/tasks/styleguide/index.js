const gulpset = require('./../../gulpset');
const gulp = require('gulp');

// @verbose
gulpset.gulp.task('styleguide', () => gulpset.tasks.styleguide());

gulpset.confs.styleguide = { src: './aigis_config.yml' };

//----------------------------------------------------------------------------------------------------
///
const aigis = require('gulp-aigis');

gulpset.tasks.styleguide = conf => {
  const config = conf || gulpset.confs.styleguide || {};
  return gulp.src(config.src).pipe(aigis());
};
