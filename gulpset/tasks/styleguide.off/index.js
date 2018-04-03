const gulpset = require('./../../gulpset');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const styleguide = conf => {
	const config = conf || gulpset.confs.styleguide || {};
	return gulp.src(config.src).pipe($.aigis());
};

// @verbose
gulpset.gulp.task('styleguide', () => styleguide());
