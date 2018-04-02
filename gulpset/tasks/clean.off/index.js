const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('clean', () => clean());

//---------------------------------------------------------------------
//
const del = require('del');

const clean = path => {
	path = path || gulpset.paths.dest;
	return del(path);
};
