const gulpset = require('./../../gulpset');

//------------------------------------------------------------------------
//
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const pug = (data, conf) => {
	data = data || gulpset.confs.pug.data || {};
	conf = conf || gulpset.confs.pug || {};

	return gulp
		.src(conf.entry)
		.pipe($.plumber())
		.pipe($.changed(conf.dest))
		.pipe(
			$.pug({
				pretty: true
			})
		)
		.pipe(gulp.dest(conf.dest))
		.pipe(gulpset.stream());
};

// @verbose
gulpset.gulp.task('pug', () => pug());
