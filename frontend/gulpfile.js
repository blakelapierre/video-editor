const gulp = require('gulp'),
      multipipe = require('multipipe'),
      path = require('path'),
      browserify = require('browserify'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload,
      source = require('vinyl-source-stream'),
      {
        autoprefixer,
        cached,
        clean,
        concat,
        jshint,
        less,
        lessReporter,
        minifyCss,
        minifyHtml,
        pipe,
        print,
        remember,
        sequence,
        sourcemaps,
        uglify,
        util
      } = require('gulp-load-plugins')();

gulp.task('default', ['build']);

gulp.task('build', sequence('clean', ['js:debug', 'less:debug', 'html', 'images', 'fonts'], ['minify-css', 'minify-html', 'minify-js']));

gulp.task('dev', cb => {
  sequence(['js:debug', 'less:debug', 'html'], 'browser-sync')(cb);
  gulp.watch(paths.html, [reload]);
  gulp.watch(paths.scripts.concat(['src/modules/**/*.html']), ['js:debug', reload]);
  gulp.watch(paths.less, ['less:debug'])
      .on('change', event => {
        if (event.type === 'deleted') {
          delete cached.caches['less'][event.path];
          remember.forget('less', event.path);
        }
      });
});

gulp.task('browser-sync', () => reload());

gulp.task('js:debug', ['jshint'],
  () => pipe([
    browserify({
      entries: [paths.app],
      debug: true
    }).bundle()
    ,source('app.js')
    ,print()
    ,gulp.dest(paths.dist)
  ]));

gulp.task('js', ['jshint']);

gulp.task('jshint',
  () => pipe([
    gulp.src(paths.scripts)
    ,cached('jshint')
    ,print()
    ,jshint()
    ,jshint.reporter('jshint-stylish')
    ,jshint.reporter('fail')
  ]));

gulp.task('less:debug',
  () => multipipe( // my gulp-pipe fails here because of the less().on [doesn't forward errors]
    gulp.src(paths.less)
    ,print()
    ,cached('less')
    ,sourcemaps.init()
    ,less().on('error', lessReporter)
    ,autoprefixer()
    ,sourcemaps.write()
    ,remember('less')
    ,concat('app.css')
    ,print()
    ,gulp.dest(paths.dist)
    ,reload({stream: true})
  ));

gulp.task('minify-css',
  () => pipe([
    gulp.src(['.dist/app.css'])
    ,print()
    ,minifyCss()
    ,gulp.dest(paths.dist)
  ]));

gulp.task('minify-js',
  () => pipe([
    gulp.src(['.dist/app.js'])
    ,print()
    ,uglify()
    ,gulp.dest(paths.dist)
  ]));

gulp.task('minify-html',
  () => pipe([
    gulp.src(['.dist/index.html'])
    ,print()
    ,minifyHtml()
    ,gulp.dest(paths.dist)
  ]));

gulp.task('html',
  () => pipe([
    gulp.src(paths.html)
    ,print()
    ,gulp.dest(paths.dist)
  ]));

gulp.task('browser-sync',
  () => browserSync({
    server: {
      baseDir: paths.dist
    }
  }));

gulp.task('images');

gulp.task('fonts');

gulp.task('clean',
  () => pipe([
    gulp.src(paths.dist, {read: false})
    ,clean()
  ]));

const paths = {
  html: ['src/index.html'],
  scripts: ['src/**/*.js'],
  app: ['./src/app.js'],
  less: ['src/**/*.less'],
  src: 'src',
  dist: '.dist'
};