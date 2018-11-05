const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('imagemin', () => gulpset.tasks.imagemin());

gulpset.confs.imagemin = {
  src: [gulpset.paths.src + '**/*.{png,jpg,gif}'],
  dest: gulpset.paths.dest
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');

gulpset.tasks.imagemin = conf => {
  conf = conf || gulpset.confs.imagemin || {};
  return gulp
    .src(conf.src)
    .pipe(plumber())
    .pipe(
      imagemin({
        plugins: [imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng()]
      })
    )
    .pipe(gulp.dest(conf.dest));
};
