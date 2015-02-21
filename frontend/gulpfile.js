import LessPluginCleanCss from 'less-plugin-clean-css';
import LessPluginAutoPrefix from 'less-plugin-autoprefix';

const gulp = require('gulp'),
      cleancss = new LessPluginCleanCss({advanced: true}),
      autoprefix = new LessPluginAutoPrefix({browsers: ['last 2 versions']}),
      {
        pipe,
        sequence,
        cached,
        print,
        clean,
        jshint,
        less
      } = require('gulp-load-plugins')();

gulp.task('default', ['build']);

gulp.task('build', sequence('clean', ['js', 'less', 'html', 'images', 'fonts']));

gulp.task('dev', () => {
  gulp.watch(paths.scripts, ['js:debug']);
  gulp.watch(paths.less, ['less:debug']);
});

gulp.task('js:debug', ['jshint']);

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
  () => pipe([
      gulp.src(paths.less)
      ,cached('less')
      ,print('less')
      ,less({plugins: [autoprefix]})
      ,gulp.dest(paths.dist)
    ]));


gulp.task('less',
  () => pipe([
      gulp.src(paths.less)
      ,cached('less')
      ,print('less')
      ,less({plugins: [autoprefix, cleancss]})
      ,gulp.dest(paths.dist)
    ]));

gulp.task('html');

gulp.task('images');

gulp.task('fonts');

gulp.task('clean',
  () => pipe([
    gulp.src(paths.dist, {read: false})
    ,clean()
  ]));

const paths = {
  scripts: ['src/**/*.js'],
  less: ['src/**/*.less'],
  dist: '.dist'
};