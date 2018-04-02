const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('stylint', () => stylint());

gulpset.confs.stylint = {
	src: [gulpset.paths.src + '**/*.styl']
};

//---------------------------------------------------------------------------
//
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const stylint = conf => {
	const config = conf || gulpset.confs.stylint || {};
	return gulp
		.src(config.src)
		.pipe($.plumber())
		.pipe($.stylint())
		.pipe($.stylint.reporter());
};
