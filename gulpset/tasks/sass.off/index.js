var gulpset = require("./../../gulpset");


// @verbose
gulpset.gulp.task("sass", function(cb) { return gulpset.tasks.sass(cb, false); });
// @verbose
gulpset.gulp.task("sass-minify", function(cb) { return gulpset.tasks.sass(cb, true); });


gulpset.confs.sass = [{
  src: gulpset.paths.src + "app.scss",
  dest: gulpset.paths.dest,
  browsers: ["last 3 versions"],
  spritesheet: {
    stylesheetPath: gulpset.paths.dest + "assets/app/css/",
    spritePath: gulpset.paths.dest + "assets/app/imgs/spritesheets/"
  }
}];



//----------------------------------------------------------------------------------------------------
///
var gulp = require("gulp");
var plumber = require("gulp-plumber");
var gulpif = require("gulp-if");
var es = require("event-stream");
var sass = require("gulp-sass");
var sassGlob = require("gulp-sass-glob");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sprites = require("postcss-sprites");
var sourcemaps = require("gulp-sourcemaps");
var _ = require("lodash");

gulpset.tasks.sass = function (cb, doMinify, browsers, conf) {
  doMinify = doMinify === true;
  conf = conf || gulpset.confs.sass || {};
  if(!Array.isArray(conf)) conf = [conf];

  var options = {
    outputStyle: doMinify ? "compressed" : "expanded"
  };

  var streams = conf.map(function(entry) {
    entry.browsers = entry.browsers || ["last 3 versions"];
    if(browsers) entry.browsers = browsers;

    var processors = [
      autoprefixer({add: false, browsers: []}),
      autoprefixer({browsers: entry.browsers})
    ];

    if(entry.spritesheet) {
      entry.spritesheet = _.merge({
        stylesheetPath: null,
        spritePath: null,
        retina: true,
        outputDimensions: true,
        spritesmith: {
          padding: 2
        }
      }, entry.spritesheet);
      processors.push(sprites(entry.spritesheet));
    }

    return gulp.src(entry.src)
      .pipe(plumber())
      .pipe(sassGlob())
      .pipe(gulpif(!doMinify, sourcemaps.init()))
      .pipe(sass(options).on("error", sass.logError))
      .pipe(postcss(processors))
      .pipe(gulpif(!doMinify, sourcemaps.write("./")))
      .pipe(gulp.dest(entry.dest))
      .pipe(gulpset.stream({ match: '**/*.css' }));
  });

  es.merge(streams).on("end", function() {
    cb();
  });
};
