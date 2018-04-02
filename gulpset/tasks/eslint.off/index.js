const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('eslint', () => eslint());

gulpset.confs.eslint = {
	src: [`${gulpset.paths.src}**/*.jsx`]
};

//--------------------------------------------------------
//
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const eslint = conf => {
	const config = conf || gulpset.confs.eslint || {};
	return gulp
		.src(config.src)
		.pipe($.plumber())
		.pipe($.eslint())
		.pipe($.eslint.format());
};
