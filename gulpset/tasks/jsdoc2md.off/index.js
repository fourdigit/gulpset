const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('jsdoc2md', () => jsdoc2md());

gulpset.confs.jsdoc2md = {
	src: [`${gulpset.paths.src}**/*.jsx`],
	dest: `${gulpset.paths.docs}jsdoc/`,
	destFile: 'doc.md'
};

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const gulpJsdoc2md = require('gulp-jsdoc-to-markdown');

const jsdoc2md = conf => {
	conf = conf || gulpset.confs.jsdoc2md || {};
	return gulp
		.src(conf.src)
		.pipe($.concat(conf.destFile))
		.pipe(gulpJsdoc2md({ 'no-gfm': false }))
		.pipe(gulp.dest(conf.dest));
};
