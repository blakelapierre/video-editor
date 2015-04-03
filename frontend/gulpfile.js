const {dependencies} = require('./package.json'),
      gulp = require('gulp'),
      multipipe = require('multipipe'),
      path = require('path'),
      browserify = require('browserify'),
      browserSync = require('browser-sync'),
      reload = browserSync.reload,
      source = require('vinyl-source-stream'),
      _ = require('lodash'),
      {
        autoprefixer,
        cached,
        clean,
        concat,
        imagemin,
        jshint,
        less,
        lessReporter,
        minifyCss,
        minifyHtml,
        pipe,
        print,
        remember,
        revAll,
        sequence,
        sourcemaps,
        tasks,
        uglify,
        util
      } = require('gulp-load-plugins')();

const result = tasks(gulp, require);
if (typeof result === 'string') console.log(result);

let p = name => print(file => console.log(name, file));

gulp.task('default', ['build']);

gulp.task('build', sequence(['clean-rev', 'clean-dist'],
                            ['js-vendor', 'js-app', 'less:debug', 'html', 'images', 'fonts'],
                            ['minify-css', 'minify-html', 'minify-js', 'minify-images'],
                            'rev'));

gulp.task('dev', cb => {
  const {src} = paths;

  sequence('clean-dev', ['js-vendor', 'js-app', 'less:debug', 'html', 'images'], 'browser-sync')(cb);

  gulp.watch(src.html, ['html']);
  gulp.watch(src.scripts, ['js-app']);
  gulp.watch(src.templates, ['js-app']);
  gulp.watch(src.vendor, ['js-vendor']);
  gulp.watch(src.less, ['less:debug'])
      .on('change', event => {
        if (event.type === 'deleted') {
          delete cached.caches['less'][event.path];
          remember.forget('less', event.path);
        }
      });
});

gulp.task('browser-sync',
  () => browserSync({
    server: paths.dev.$,
    ghostMode: false
  }));

gulp.task('js-vendor',
  () => pipe([
    browserify()
      .require(_.keys(dependencies))
      .bundle()
    ,source('vendor.js')
    ,p('js-vendor')
    ,gulp.dest(paths.dev.$)
    ,reload({stream: true})
  ]));

gulp.task('js-app', ['jshint'],
  () => pipe([
    browserify({
      entries: [paths.src.app],
      debug: true
    })
      .external(_.keys(dependencies))
      .bundle()
    ,source('app.js')
    ,p('js-app')
    ,gulp.dest(paths.dev.$)
    ,reload({stream: true})
  ]));

gulp.task('jshint',
  () => pipe([
    gulp.src(paths.src.scripts)
    ,cached('jshint')
    ,p('jshint')
    ,jshint()
    ,jshint.reporter('jshint-stylish')
    ,jshint.reporter('fail')
  ]));

gulp.task('less:debug',
  () => multipipe( // my gulp-pipe fails here because of the less().on [doesn't forward errors]
    gulp.src(paths.src.less)
    ,cached('less')
    ,p('less:debug')
    ,sourcemaps.init()
    ,less()
      .on('error', lessReporter)
    ,autoprefixer()
    ,sourcemaps.write()
    ,remember('less')
    ,concat('app.css')
    ,p('less:debug:concat:post')
    ,gulp.dest(paths.dev.$)
    ,print(f => `reload${f}`)
    ,reload({stream: true})
  ));

gulp.task('html',
  () => pipe([
    gulp.src(paths.src.html)
    ,p('html')
    ,gulp.dest(paths.dev.$)
    ,reload({stream: true})
  ]));

gulp.task('images',
  () => pipe([
    gulp.src(paths.src.images)
    ,p('images')
    ,gulp.dest(paths.dev.$)
  ]));

gulp.task('minify-css',
  () => pipe([
    gulp.src([paths.dev.css])
    ,p('minify-css')
    ,minifyCss()
    ,gulp.dest(paths.rev.$)
  ]));

gulp.task('minify-js',
  () => pipe([
    gulp.src([paths.dev.app].concat([paths.dev.vendor]))
    ,p('minify-js')
    ,uglify()
    ,gulp.dest(paths.rev.$)
  ]));

gulp.task('minify-html',
  () => pipe([
    gulp.src([paths.dev.html])
    ,p('minify-html')
    ,minifyHtml({quotes: true})
    ,gulp.dest(paths.rev.$)
  ]));

gulp.task('minify-images',
  () => pipe([
    gulp.src([paths.dev.images])
    ,p('minify-images')
    ,imagemin()
    ,gulp.dest(paths.rev.$)
  ]));

gulp.task('rev',
  () => pipe([
    gulp.src([paths.rev.$all])
    ,p('rev:pre')
    ,revAll({ignore: ['index.html']})
    ,p('rev:post')
    ,gulp.dest(paths.dist.$)
  ]));

gulp.task('fonts');

gulp.task('clean-dev',
  () => pipe([
    gulp.src(paths.dev.$, {read: false})
    ,clean()
  ]));

gulp.task('clean-dist',
  () => pipe([
    gulp.src(paths.dist.$, {read: false})
    ,clean()
  ]));

gulp.task('clean-rev',
  () => pipe([
    gulp.src(paths.rev.$, {read: false})
    ,clean()
  ]));

const paths = {
  src: {
    $: './src',
    app: ['./src/app.js'],
    less: ['src/**/*.less'],
    html: ['./src/index.html'],
    images: ['./src/**/*.{svg,gif,png,jpg}'],
    scripts: ['src/**/*.js'],
    templates: ['src/modules/**/template.html'],
    vendor: ['!./node_modules/*/node_modules/**']
            .concat(_.map(dependencies, (version, dependency) => { return `./node_modules/${dependency}/**/*.js`; } )),
  },
  dev: {
    $: './.dev',
    $all: './.dev/**',
    app: './.dev/app.js',
    css: './.dev/app.css',
    html: './.dev/index.html',
    images: './.dev/**/*.{svg,gif,png,jpg}',
    vendor: './.dev/vendor.js'
  },
  rev: {
    $: './.rev',
    $all: './.rev/**'
  },
  dist: {
    $: './.dist',
    app: './.dist/app.js',
    css: './.dist/app.css',
    html: './.dist/index.html'
  }
};