// =====================================
// Required
// =====================================

var gulp          = require('gulp'),
    browserSync   = require('browser-sync'),
    reload        = browserSync.reload,
    uglify        = require('gulp-uglify'),
    sass          = require('gulp-sass'),
    plumber       = require('gulp-plumber'),
    autoprefixer  = require('gulp-autoprefixer'),
    del           = require('del'),
    rename        = require('gulp-rename'),
    imagemin      = require('gulp-imagemin'),
    pngquant      = require('imagemin-pngquant');

// =====================================
// Copy Task
// =====================================

gulp.task('copy', function() {
  gulp.src('bower_components/normalize.css/normalize.css')
    .pipe(plumber())
    .pipe(rename('scss/1-base/_normalize.scss'))
    .pipe(gulp.dest('./app/assets'));
  return gulp.src('app/*.{ico,txt}')
      .pipe(gulp.dest('dist/'));
});


// =====================================
// Imagemin Task
// =====================================

gulp.task('images', function () {
  return gulp.src('app/assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dist/img'))
    .pipe(reload({stream:true}));
});

// =====================================
// Sass Tasks
// =====================================

gulp.task('sass', function() {
  gulp.src('app/assets/scss/main.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(reload({stream:true}));
});

// =====================================
// HTML Task
// =====================================

gulp.task('html', function() {
  gulp.src('app/**/*.html')
   .pipe(gulp.dest('dist/'))
   .pipe(reload({stream:true}));
});


// =====================================
// Build Tasks
// =====================================

// Delete all files and folders from build directory
gulp.task('build:delete', function(callback) {
  del([
    'build/**'
  ], callback);
});


// Create build directory for all files
gulp.task('build:copy', ['build:delete'], function() {
  return gulp.src('dist/**/*/')
  .pipe(gulp.dest('build/'));
});

// Remove unwanted files from build directory
gulp.task('build:remove', ['build:copy'], function(callback) {
  del([
    'build/assets/scss/',
    'build/assets/js/!(*.min.js)'
  ], callback);
});

gulp.task('build', ['build:copy', 'build:remove']);


// =====================================
// Browser-Sync Task
// =====================================

gulp.task('browser-sync', function() {
    browserSync({
      server:{
        baseDir: "./dist/"
      }
    });
});

// Final build server
gulp.task('build:server', function() {
    browserSync({
      server:{
        baseDir: "./build/"
      }
    });
});


// =====================================
// Scripts
// =====================================

gulp.task('scripts', function() {
  gulp.src(['app/assets/js/**/*.js', '!app/assets/js/**/*.min.js'])
    .pipe(plumber())
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({stream:true}));
});

// =====================================
// Watch Tasks
// =====================================

gulp.task('watch', function() {
  gulp.watch('app/assets/js/**/*.js', ['scripts']);
  gulp.watch('app/assets/scss/**/*.scss', ['sass']);
  gulp.watch('app/assets/img/**/*', ['images']);
  gulp.watch('app/**/*.html', ['html']);
});

// =====================================
// Default Task
// =====================================

gulp.task('default', ['copy', 'sass', 'scripts', 'images', 'html', 'browser-sync', 'watch']);
