const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('jsdoc', () => jsdoc());

gulpset.confs.jsdoc = {
	src: [gulpset.paths.src + '**/*.jsx'],
	dest: gulpset.paths.docs + 'jsdoc/'
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

gulpset.tasks.jsdoc = conf => {
	conf = conf || gulpset.confs.jsdoc || {};
	return gulp
		.src(conf.src, { read: false })
		.pipe($.plumber())
		.pipe(
			$.jsdoc({
				opts: {
					destination: conf.dest
				}
			})
		);
};
