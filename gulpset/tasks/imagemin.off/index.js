var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("imagemin",	function() { return gulpset.tasks.imagemin(); });


gulpset.confs.imagemin = {
	src: [gulpset.paths.src + "**/*.{png,jpg,gif}"],
	dest: gulpset.paths.dest
};



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var imagemin = require("gulp-imagemin");

gulpset.tasks.imagemin = function(conf) {
	conf = conf || gulpset.confs.imagemin || {};
	return gulp.src(conf.src)
		.pipe(plumber())
		.pipe(imagemin({ plugins: [imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng()] }))
		.pipe(gulp.dest(conf.dest));
};
