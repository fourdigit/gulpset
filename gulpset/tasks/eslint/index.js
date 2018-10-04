const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('eslint', function() {
  return gulpset.tasks.eslint();
});
// @verbose
gulpset.gulp.task('eslint-fix', function() {
  return gulpset.tasks.eslint(true);
});

gulpset.confs.eslint = {
  src: [gulpset.paths.src + '**/*.{js,jsx}']
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const eslint = require('gulp-eslint');
const gulpif = require('gulp-if');

gulpset.tasks.eslint = function(doFix, conf) {
  doFix = doFix === true;
  conf = conf || gulpset.confs.eslint || {};
  return gulp
    .src(conf.src)
    .pipe(plumber())
    .pipe(
      eslint({
        fix: doFix
      })
    )
    .pipe(eslint.format())
    .pipe(gulpif(doFix, gulp.dest(conf.src.toString().replace(/\*.*$/, ''))));
};
