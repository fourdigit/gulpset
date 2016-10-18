var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("sasslint",	function() { return gulpset.tasks.sasslint(); });


gulpset.confs.sasslint = {
	config: "./.sass-lint.yml",
	src: [gulpset.paths.src + "**/*.{scss,sass}"]
};



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sasslint = require('gulp-sass-lint');

gulpset.tasks.sasslint = function(conf) {
	conf = conf || gulpset.confs.sasslint || {};
	return gulp.src(conf.src)
		.pipe(plumber())
		.pipe(sasslint({config: conf.config}))
		.pipe(sasslint.format());
};
