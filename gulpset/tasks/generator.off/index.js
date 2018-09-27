const gulpset = require('./../../gulpset');

// @verbose
gulpset.gulp.task('generator', cb => gulpset.tasks.generator(cb));

gulpset.confs.generator = {
  data: './generator/data.csv'
};

//----------------------------------------------------------------------------------------------------
///
const fs = require('fs');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const template = require('gulp-template');
const iconv = require('iconv-lite');
const csv = require('fast-csv');
const rename = require('gulp-rename');

gulpset.tasks.generator = (cb, conf) => {
  conf = conf || gulpset.confs.generator || {};
  const fileContent = iconv.decode(fs.readFileSync(conf.data), 'shift_jis').replace(/(\r\n|\r|\n)/gi, '\n');
  const options = {
    imports: {
      nl2br: str => {
        return str.replace(/\n/gi, '<br />\n');
      },
      escapehtml: str => {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      },
      escapeurl: encodeURIComponent
    }
  };
  csv
    .fromString(fileContent, { headers: true })
    .on('data', data => {
      var tmpl = data.template;
      var dest = data.destination;
      delete data.template;
      delete data.destination;
      gulp
        .src(tmpl)
        .pipe(plumber())
        .pipe(template(data, options))
        .pipe(rename(dest))
        .pipe(gulp.dest('./'));
    })
    .on('end', () => {
      cb();
    });
};
