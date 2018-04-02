const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('stylus', () => stylus(false));
// @verbose
gulpset.gulp.task('stylus-minify', () => stylus(true));
// @verbose
gulpset.gulp.task('styleguide-theme', () => styleguideTheme());

gulpset.confs.stylus = {
	src: [`${gulpset.paths.src}**/!(_)*.styl`],
	dest: gulpset.paths.dest
};

//---------------------------------------------------------------------------
//
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');

const stylus = (doMinify, browsers, conf) => {
	if (doMinify === undefined) doMinify = false;
	conf = conf || gulpset.confs.stylus || {};
	conf.browsers = conf.browsers || ['last 3 versions'];
	if (browsers) conf.browsers = browsers;

	return gulp
		.src(conf.entry)
		.pipe($.plumber())
		.pipe($.if(doMinify !== true, $.sourcemaps.init()))
		.pipe(
			$.stylus({
				'include css': true
			})
		)
		.pipe(
			$.postcss([
				autoprefixer({
					browsers: conf.browsers
				})
			])
		)
		.pipe($.if(doMinify !== true, $.sourcemaps.write('./')))
		.pipe(gulp.dest(conf.dest))
		.pipe(gulpset.stream());
};

const styleguideTheme = conf => {
	conf = conf || gulpset.confs.styleguideTheme || {};

	return gulp
		.src(conf.src)
		.pipe($.plumber())
		.pipe($.stylus())
		.pipe(gulp.dest(conf.dest))
		.pipe(gulpset.stream());
};
