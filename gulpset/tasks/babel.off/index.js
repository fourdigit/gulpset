var gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('babel', cb => babel(cb));

// @verbose
gulpset.gulp.task('babel-watch', cb => babel(cb, true, false));

// @verbose
gulpset.gulp.task('babel-minify', cb => babel(cb, false, true));

gulpset.confs.babel = [
	{
		src: `${gulpset.paths.src}js/source.jsx`,
		paths: ['./node_modules', `${gulpset.paths.src}js`],
		dest: `${gulpset.paths.dest}assets/app/js/`,
		file: 'dest.js'
	}
];

//----------------------------------------------------------------------------------------------------
///
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var licensify = require('licensify');
var uglify = require('gulp-uglify');
var prettyHrtime = require('pretty-hrtime');
var assign = require('lodash').assign;
var optimizejs = require('gulp-optimize-js');

gulpset.tasks.babel = (cb, doWatch, doMinify, doLicensify, conf) => {
	if (doWatch === undefined) doWatch = false;
	if (doMinify === undefined) doMinify = false;
	if (doLicensify === undefined) doLicensify = false;
	conf = conf || gulpset.confs.babel || {};

	var babel = (obj, doWatch, onFirstBuild) => {
		var browserifyOpts = {
			entries: [obj.src],
			transform: [
				babelify.configure({
					plugins: [
						'transform-class-properties',
						'transform-inline-environment-variables'
					],
					presets: [['es2015', { loose: true }], 'react']
				})
			],
			extensions: ['.js', '.jsx', '.es6'],
			paths: obj.paths,
			plugin: [],
			debug: true
		};
		if (doLicensify) browserifyOpts.plugin.push(licensify);
		if (doWatch) browserifyOpts = assign({}, watchify.args, browserifyOpts);

		var b = browserify(browserifyOpts);
		var compile = (isInitial, onComplete) => {
			isInitial = isInitial === true;
			gutil.log(
				'Starting',
				"'" + gutil.colors.cyan('browserify') + "'",
				'file ' + gutil.colors.magenta(obj.file),
				'...'
			);
			var startTime = process.hrtime();
			return (
				b
					.bundle(err => {
						var elapsedTime = prettyHrtime(
							process.hrtime(startTime)
						);
						if (err) {
							gutil.log(
								'Finished',
								"'" + gutil.colors.cyan('browserify') + "'",
								'file ' + gutil.colors.magenta(obj.file),
								gutil.colors.red('error')
							);
							console.log(err.toString());
							if (err.codeFrame) {
								console.log('-------------------------');
								console.log(err.codeFrame);
								console.log('-------------------------');
							}
							if (isInitial && onComplete) onComplete();
						} else {
							gutil.log(
								'Finished',
								"'" + gutil.colors.cyan('browserify') + "'",
								'file ' + gutil.colors.magenta(obj.file),
								'after',
								gutil.colors.magenta(elapsedTime)
							);
						}
					})
					.pipe(plumber())
					.pipe(source(obj.file))
					.pipe(buffer())
					.pipe(
						gulpif(
							doMinify !== true,
							sourcemaps.init({ loadMaps: true })
						)
					)
					.pipe(
						gulpif(
							doMinify === true,
							uglify({
								compress: {
									negate_iife: false
								}
							})
						)
					)
					.pipe(gulpif(doMinify === true, optimizejs()))
					.pipe(gulpif(doMinify !== true, sourcemaps.write('./')))
					.pipe(gulp.dest(obj.dest))
					//.pipe(gulpset.stream()) // TODO: fix this
					.on('end', () => {
						if (isInitial && onComplete) onComplete();
					})
			);
		};
		if (doWatch) {
			b = watchify(b);
			b.on('update', id => {
				gutil.log('Browserify update: ' + id);
				compile(false);
			});
		}
		return compile(true, onFirstBuild);
	};
	var complete = 0;
	for (var i = 0, iLen = conf.length; i < iLen; i++) {
		babel(conf[i], doWatch, () => {
			if (++complete >= iLen) {
				cb();
			}
		});
	}
};
