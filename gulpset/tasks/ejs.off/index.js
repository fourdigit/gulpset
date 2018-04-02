const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('ejs', () => ejs());

gulpset.confs.ejs = {
	src: [gulpset.paths.src + '**/*.ejs'],
	dest: gulpset.paths.dest,
	data: {},
	options: {
		root: process.cwd()
	},
	settings: {
		ext: '.html'
	}
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const ejs = (data, options, settings, conf) => {
	data = data || gulpset.confs.ejs.data || {};
	options = options || gulpset.confs.ejs.options || {};
	settings = settings || gulpset.confs.ejs.settings || {};
	conf = conf || gulpset.confs.ejs || {};

	return gulp
		.src(conf.src)
		.pipe($.plumber())
		.pipe($.changed(conf.dest))
		.pipe($.ejs(data, options, settings))
		.pipe(gulp.dest(conf.dest))
		.pipe(gulpset.stream());
};
