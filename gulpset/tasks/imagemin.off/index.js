const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('imagemin', () => imagemin());

gulpset.confs.imagemin = {
	src: [gulpset.paths.src + '**/*.{png,jpg,gif,svg}'],
	dest: gulpset.paths.dest
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const imagemin = conf => {
	conf = conf || gulpset.confs.imagemin || {};
	return gulp
		.src(conf.src)
		.pipe($.plumber())
		.pipe(
			$.imagemin({
				plugins: [
					imagemin.gifsicle(),
					imagemin.jpegtran(),
					imagemin.optipng()
				]
			})
		)
		.pipe(gulp.dest(conf.dest));
};
