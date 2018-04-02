const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('docs', () => docs());

//--------------------------------------------------------
//
const gulp = require('gulp');
const frontMatter = require('gulp-front-matter');
const $ = require('gulp-load-plugins')();

const docs = conf => {
	const config = conf || gulpset.confs.docs || {};
	return gulp
		.src(config.src)
		.pipe(
			frontMatter({
				remove: true
			})
		)
		.pipe($.markdown())
		.pipe($.layout(file => file.frontMatter))
		.pipe(gulp.dest(config.dest))
		.pipe(gulpset.stream());
};
