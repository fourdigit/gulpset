const gulpset = require('./gulpset/gulpset');

/**
 * development build + watch + browsersync
 */
gulpset.gulp.task(
	'dev',
	gulpset.gulp.series(
		gulpset.gulp.parallel(
			'copy',
			'stylint',
			'imagemin',
			'stylus',
			'pug',
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
			'stylint',
			'imagemin',
			'stylus-minify',
			'pug',
			'styleguide-theme',
			'docs'
		)
	)
);
