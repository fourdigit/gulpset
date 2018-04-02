const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('concat', () => concat());

// @verbose
gulpset.gulp.task('concat-minify', () => concat(true));

gulpset.confs.concat = [
	{
		dest: `${gulpset.paths.dest}js/`,
		concat: 'concat.js',
		src: [
			`${gulpset.paths.src}js/source1.js`,
			`${gulpset.paths.src}js/source2.js`
		]
	}
];

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const stream = require('event-stream');

const concat = (doMinify, uglifyOptions, conf) => {
	if (doMinify === undefined) doMinify = false;
	conf = conf || gulpset.confs.concat || {};
	uglifyOptions = uglifyOptions || {};

	var arr = [];
	for (var i = 0, iLen = conf.length; i < iLen; i++) {
		arr.push(
			(i => {
				var node = conf[i];
				return gulp
					.src(node.src)
					.pipe($.plumber())
					.pipe($.if(doMinify === true, $.uglify(uglifyOptions)))
					.pipe($.concat(node.concat))
					.pipe(gulp.dest(node.dest))
					.pipe(gulpset.stream());
			})(i)
		);
	}
	return stream.merge(arr);
};
