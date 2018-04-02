const gulpset = require('./gulpset/gulpset');

/**
 * development build + watch + browsersync
 */
gulpset.gulp.task(
	'dev',
	gulpset.gulp.series(
		'clean',
		gulpset.gulp.parallel(
			'copy',
			'eslint',
			'stylint',
			'babel-watch',
			'imagemin',
			'stylus',
			'pug',
			'styleguide',
			'styleguide-theme',
			'docs'
		),
		'watch',
		'browsersync'
	)
);

gulpset.gulp.task(
	'build',
	gulpset.gulp.series(
		'clean',
		gulpset.gulp.parallel(
			'copy',
			'eslint',
			'stylint',
			'babel',
			'imagemin',
			'stylus-minify',
			'pug',
			'styleguide',
			'styleguide-theme',
			'docs'
		)
	)
);
