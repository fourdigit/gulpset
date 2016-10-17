var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("stylint",			function() { return gulpset.tasks.stylint(); });


gulpset.confs.stylint = {
	src: [gulpset.paths.src + "**/*.styl"]
};



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var stylint = require('gulp-stylint');

gulpset.tasks.stylint = function(conf) {
	conf = conf || gulpset.confs.stylint || {};
	return gulp.src(conf.src)
		.pipe(plumber())
		.pipe(stylint())
		.pipe(stylint.reporter());
};
