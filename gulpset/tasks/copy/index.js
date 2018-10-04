const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('copy', () => gulpset.tasks.copy());

gulpset.confs.copy = {
  src: [
    gulpset.paths.src + '**/*.{html,htm,css,ico,json,xml,woff,woff2,ttf,eot,mp4,webm,jpeg,jpg,gif,png,svg,map,mp3}'
  ],
  dest: gulpset.paths.dest
};

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');

gulpset.tasks.copy = conf => {
  conf = conf || gulpset.confs.copy || {};
  return gulp
    .src(conf.src)
    .pipe(plumber())
    .pipe(changed(conf.dest))
    .pipe(gulp.dest(conf.dest))
    .pipe(gulpset.stream());
};
