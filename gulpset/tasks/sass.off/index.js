var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("sass",			function() { return gulpset.tasks.sass(false); });
// @verbose
gulpset.gulp.task("sass-minify",	function() { return gulpset.tasks.sass(true); });


gulpset.confs.sass = {
	src: [gulpset.paths.src + "**/*.{scss,sass}"],
	dest: gulpset.paths.dest
};



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var gulpif = require("gulp-if");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");

gulpset.tasks.sass = function(doMinify, browsers, conf) {
	if(doMinify === undefined) doMinify = false;
	conf = conf || gulpset.confs.sass || {};
	conf.browsers = conf.browsers || ["last 3 versions"];
	if(browsers) conf.browsers = browsers;

	var options = {};
	if(doMinify) options.outputStyle = "compressed";

	return gulp.src(conf.src)
		.pipe(plumber())
		.pipe(gulpif(doMinify !== true, sourcemaps.init()))
		.pipe(sass(options).on("error", sass.logError))
		.pipe(postcss([autoprefixer({browsers: conf.browsers})]))
		.pipe(gulpif(doMinify !== true, sourcemaps.write("./")))
		.pipe(gulp.dest(conf.dest))
		.pipe(gulpset.stream({match: '**/*.css'}));
};
