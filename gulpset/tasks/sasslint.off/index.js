const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('sasslint', () => sasslint());

gulpset.confs.sasslint = {
	config: './.sass-lint.yml',
	src: [gulpset.paths.src + '**/*.{scss,sass}']
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const sasslint = require('gulp-sass-lint');

const sasslint = conf => {
	conf = conf || gulpset.confs.sasslint || {};
	return gulp
		.src(conf.src)
		.pipe($.plumber())
		.pipe(sasslint({ config: conf.config }))
		.pipe(sasslint.format());
};
