var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("stylus",			function() { return gulpset.tasks.stylus(false); });
// @verbose
gulpset.gulp.task("stylus-minify",	function() { return gulpset.tasks.stylus(true); });


gulpset.confs.stylus = {
	src: [gulpset.paths.src + "**/!(_)*.styl"],
	dest: gulpset.paths.dest
};



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var gulpif = require("gulp-if");
var stylus = require("gulp-stylus");
var nib = require("nib");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");

gulpset.tasks.stylus = function(doMinify, browsers, conf) {
	if(doMinify === undefined) doMinify = false;
	conf = conf || gulpset.confs.stylus || {};
	conf.browsers = conf.browsers || ["last 3 versions"];
	if(browsers) conf.browsers = browsers;

	return gulp.src(conf.src)
		.pipe(plumber())
		.pipe(gulpif(doMinify !== true, sourcemaps.init()))
		.pipe(stylus({
			compress: doMinify,
			use: [nib()],
			"include css": true
		}))
		.pipe(postcss([autoprefixer({browsers: conf.browsers})]))
		.pipe(gulpif(doMinify !== true, sourcemaps.write("./")))
		.pipe(gulp.dest(conf.dest))
		.pipe(gulpset.stream({match: '**/*.css'}));
};
