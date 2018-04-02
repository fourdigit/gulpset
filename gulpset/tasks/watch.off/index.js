const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('watch', cb => {
	watch(cb);
});

gulpset.confs.watch = [
	{
		watch: '',
		run: ['']
	}
];

//------------------------------------------------------------------
//
const gulp = require('gulp');

const watch = (cb, conf) => {
	conf = conf || gulpset.confs.watch || {};
	for (let i = 0, iLen = conf.length; i < iLen; i++) {
		const node = conf[i];
		gulp.watch(node.watch, node.run);
	}
	cb();
};
