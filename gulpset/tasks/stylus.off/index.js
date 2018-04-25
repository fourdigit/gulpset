const gulpset = require("./../../gulpset");

// @verbose
gulpset.gulp.task("stylus", cb => gulpset.tasks.stylus(cb, false));

// @verbose
gulpset.gulp.task("stylus-minify", cb => gulpset.tasks.stylus(cb, true));

gulpset.confs.stylus = [
  {
    src: gulpset.paths.src + "app.styl",
    dest: gulpset.paths.dest,
    spritesheet: {
      stylesheetPath: gulpset.paths.dest + "assets/app/css/",
      spritePath: gulpset.paths.dest + "assets/app/imgs/spritesheets/"
    }
  }
];

//----------------------------------------------------------------------------------------------------
///
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const gulpif = require("gulp-if");
const es = require("event-stream");
const stylus = require("gulp-stylus");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sprites = require("postcss-sprites");
const sourcemaps = require("gulp-sourcemaps");
const _ = require("lodash");

gulpset.tasks.stylus = (cb, doMinify, browsers, conf) => {
  doMinify = doMinify === true;
  conf = conf || gulpset.confs.stylus || {};
  if (!Array.isArray(conf)) conf = [conf];

  const options = {
    outputStyle: doMinify ? "compressed" : "expanded"
  };

  const streams = conf.map(entry => {
    const processors = [
      autoprefixer({ add: false, browsers: [] }),
      autoprefixer()
    ];

    if (entry.spritesheet) {
      entry.spritesheet = _.merge(
        {
          stylesheetPath: null,
          spritePath: null,
          retina: true,
          outputDimensions: true,
          spritesmith: {
            padding: 2
          }
        },
        entry.spritesheet
      );
      processors.push(sprites(entry.spritesheet));
    }

    return gulp
      .src(entry.src)
      .pipe(plumber())
      .pipe(gulpif(!doMinify, sourcemaps.init()))
      .pipe(stylus(options))
      .pipe(postcss(processors))
      .pipe(gulpif(!doMinify, sourcemaps.write("./")))
      .pipe(gulp.dest(entry.dest))
      .pipe(gulpset.stream({ match: "**/*.css" }));
  });

  es.merge(streams).on("end", function() {
    cb();
  });
};
