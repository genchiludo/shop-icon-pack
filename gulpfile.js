const async = require('async');
const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');

gulp.task('generate-icons', (done) => {
  const iconStream = gulp.src(['assets/*.svg']).pipe(iconfont({
    fontName: 'shop-icon',
    prependUnicode: true,
    formats: ['ttf', 'eot', 'woff', 'svg', 'ttf', 'woff2'],
  }));
  async.parallel([(cb) => {
    iconStream.on('glyphs', (glyphs) => {
      gulp.src('templates/_icons.css')
        .pipe(consolidate('lodash', {
          glyphs,
          fontName: 'shop-icon',
          fontPath: '../fonts/',
          className: 'shop-icon',
        }))
        .pipe(gulp.dest('dist/css'))
        .on('finish', cb);
    });
  }, (cb) => {
    iconStream.pipe(gulp.dest('dist/fonts/')).on('finish', cb);
  }], done);
});
