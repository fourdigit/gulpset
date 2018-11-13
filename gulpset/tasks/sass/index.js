const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('sass', cb => gulpset.tasks.sass(cb, false));

// @verbose
gulpset.gulp.task('sass-minify', cb => gulpset.tasks.sass(cb, true));

gulpset.confs.sass = [
  {
    src: gulpset.paths.src + '**/!(_)*.scss',
    dest: gulpset.paths.dest
    // spritesheet: {
    //   stylesheetPath: gulpset.paths.dest + 'assets/css/',
    //   spritePath: gulpset.paths.dest + 'assets/imgs/spritesheets/'
    // }
  }
];

//----------------------------------------------------------------------------------------------------
///
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const gulpif = require('gulp-if');
const es = require('event-stream');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sprites = require('postcss-sprites');
const sourcemaps = require('gulp-sourcemaps');
const _ = require('lodash');
const packageImporter = require('node-sass-package-importer');

gulpset.tasks.sass = (cb, doMinify, browsers, conf) => {
  doMinify = doMinify === true;
  conf = conf || gulpset.confs.sass || {};
  if (!Array.isArray(conf)) conf = [conf];

  const options = {
    outputStyle: doMinify ? 'compressed' : 'expanded',
    importer: packageImporter({
      extensions: ['.scss', '.css']
    })
  };

  const streams = conf.map(entry => {
    const processors = [autoprefixer()];

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
      .pipe(sassGlob())
      .pipe(gulpif(!doMinify, sourcemaps.init()))
      .pipe(sass(options).on('error', sass.logError))
      .pipe(postcss(processors))
      .pipe(gulpif(!doMinify, sourcemaps.write('./')))
      .pipe(gulp.dest(entry.dest))
      .pipe(gulpset.stream({ match: '**/*.css' }));
  });

  es.merge(streams).on('end', () => {
    cb();
  });
};
