const gulpset = require("./../../gulpset");
const NODE_ENV = process.env.NODE_ENV ? "production" : "development";
const isDevelopment = NODE_ENV === "development";
const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const imagemin = require("gulp-imagemin");

/**
 * yarn add gulp-imagemin --dev
 */

gulpset.confs.imagemin = {
  src: [`${gulpset.paths.src}**/*.{png,jpg,gif,svg}`],
  dest: gulpset.paths.dest
};

const image = conf => {
  conf = conf || gulpset.confs.imagemin || {};
  return gulp
    .src(conf.src)
    .pipe($.plumber())
    .pipe(
      $.if(
        !isDevelopment,
        imagemin({
          plugins: [
            imagemin.gifsicle(),
            imagemin.jpegtran(),
            imagemin.optipng()
          ]
        })
      )
    )
    .pipe(gulp.dest(conf.dest));
};

// @verbose
gulpset.gulp.task("imagemin", () => image());
