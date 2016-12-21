var gulp = require('gulp');
var concat = require('gulp-concat');
var shell = require('gulp-shell');
var run = require('gulp-run');
var util = require('gulp-util');
var gulpif = require('gulp-if');
var sprity = require('sprity');
var env = require('gulp-env');

var lessGlob = 'less/**/*.less';
var occTools = '/vagrant/node/node /vagrant/occ-tools/main.js';

/*
* Private tasks
*/
gulp.task('set-env', function() {
  var envName = typeof util.env.env !== 'undefined' ? util.env.env : 'dev';
  env({
    file: 'config/env.' + envName + '.json'
  });
  env({
    file: 'config/oracle-widgets.json'
  });
});

gulp.task('copyFonts', function() {
    return gulp.src('images/**')
        .pipe(gulp.dest('hologram/docs/file/general/'));
});

gulp.task('build', function() {
    return gulp.src(lessGlob)
        .pipe(concat('styles.less'))
        .pipe(gulp.dest(''.concat('themes/', process.env.THEME_NAME, '_', process.env.THEME_ID, '/')));
});

/*
* Public tasks
*/
gulp.task('downloadThemes', ['set-env'], function() {
  return run(''.concat(occTools, ' --download ', 'themes')).exec();
});

gulp.task('downloadWidgets', ['set-env'], function() {
  return run(''.concat(occTools, ' --download ', 'widgets')).exec();
});

gulp.task('uploadThemes', ['set-env'], function() {
  return run(''.concat(occTools, ' --upload ', 'themes')).exec();
});

gulp.task('uploadWidgets', ['set-env'], function() {
  return run(''.concat(occTools, ' --upload ', 'widgets')).exec();
});

gulp.task('dw', ['set-env'], function() {
  return run(''.concat(occTools, ' --dw ', util.env.name)).exec();
});

gulp.task('dt', ['set-env'], function() {
  return run(''.concat(occTools, ' --dt ', util.env.name)).exec();
});

gulp.task('ut', ['set-env', 'build'], function() {
  return run(''.concat(occTools, ' --ut ', process.env.THEME_ID)).exec();
});

gulp.task('uw', ['set-env'], function() {
  return run(''.concat(occTools, ' --uw ', util.env.name)).exec();
});

gulp.task('publish', ['set-env'], function() {
  return run(''.concat(occTools, ' --publish')).exec();
});

gulp.task('downloadImages', ['set-env'], function() {
  return run(''.concat(occTools, ' --download ', 'images')).exec();
});

gulp.task('uploadImages', ['set-env'], function() {
  return run(''.concat(occTools, ' --upload ', 'images')).exec();
});

gulp.task('ui', ['set-env'], function() {
  return run(''.concat(occTools, ' --ui ', util.env.name)).exec();
});

gulp.task('di', ['set-env'], function() {
  return run(''.concat(occTools, ' --di ', util.env.name)).exec();
});

gulp.task('styleguide', ['set-env', 'build', 'ut', 'copyFonts'], function() {
  return run(''.concat(occTools, ' --downloadParsedCSS --dest /vagrant/hologram/build/ && hologram')).exec();
});

gulp.task('sprites', function() {
  return sprity.src({
    src: './sprites/src/**/*.{png,jpg}',
    style: 'sprites.less',
    template: './sprites/templates/template.hbs',
    split: true,
    cssPath: '/file/general/',
    name: 'sprite',
    prefix: 'sprite',
    dimension: [{
      ratio: 1, dpi: 72
    }, {
      ratio: 2, dpi: 192
    }],
  })
  .pipe(gulpif('*.png', gulp.dest('./images/'), gulp.dest('./less/utils/')))
});

gulp.task('deploy', ['set-env', 'ut'], function() {
  return run(''.concat(occTools, ' --deploy')).exec();
});
