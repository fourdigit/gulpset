const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('copy', () => copy());

gulpset.confs.copy = {
	src: [
		gulpset.paths.src +
			'**/*.{html,htm,css,js,ico,json,xml,woff,woff2,ttf,eot,mp4,webm,jpeg,jpg,gif,png,svg,map,mp3}'
	],
	dest: gulpset.paths.dest
};

//----------------------------------------------------------------------------------------------------
///
var gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const copy = conf => {
	conf = conf || gulpset.confs.copy || {};
	return gulp
		.src(conf.src)
		.pipe($.plumber())
		.pipe($.changed(conf.dest))
		.pipe(gulp.dest(conf.dest))
		.pipe(gulpset.stream({ match: '**/*.css' }));
};
