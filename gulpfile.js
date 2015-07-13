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
    .pipe(gulp.dest('./dist/assets'));
  return gulp.src('dist/*.{ico,txt}')
      .pipe(gulp.dest('dev/'));
});


// =====================================
// Imagemin Task
// =====================================

gulp.task('images', function () {
  return gulp.src('dist/assets/img/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest('dev/img'))
    .pipe(reload({stream:true}));
});

// =====================================
// Sass Tasks
// =====================================

gulp.task('sass', function() {
  gulp.src('dist/assets/scss/main.scss')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dev/css/'))
    .pipe(reload({stream:true}));
});

// =====================================
// HTML Task
// =====================================

gulp.task('html', function() {
  gulp.src('dist/**/*.html')
   .pipe(gulp.dest('dev/'))
   .pipe(reload({stream:true}));
});


// =====================================
// Production Tasks
// =====================================

// Delete all files and folders from production directory
gulp.task('production:delete', function(callback) {
  del([
    'prod/**'
  ], callback);
});


// Create production directory for all files
gulp.task('production:copy', ['production:delete'], function() {
  return gulp.src('dev/**/*/')
  .pipe(gulp.dest('prod/'));
});

// Remove unwanted files from production directory
gulp.task('production:remove', ['production:copy'], function(callback) {
  del([
    'prod/assets/scss/',
    'prod/assets/js/!(*.min.js)'
  ], callback);
});

gulp.task('production', ['production:copy', 'production:remove']);


// =====================================
// Browser-Sync Task
// =====================================

gulp.task('browser-sync', function() {
    browserSync({
      server:{
        baseDir: "./dev/"
      }
    });
});

// Final production server
gulp.task('production:server', function() {
    browserSync({
      server:{
        baseDir: "./prod/"
      }
    });
});


// =====================================
// Scripts
// =====================================

gulp.task('scripts', function() {
  gulp.src(['dist/assets/js/**/*.js', '!dist/assets/js/**/*.min.js'])
    .pipe(plumber())
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dev/js'))
    .pipe(reload({stream:true}));
});

// =====================================
// Watch Tasks
// =====================================

gulp.task('watch', function() {
  gulp.watch('dist/assets/js/**/*.js', ['scripts']);
  gulp.watch('dist/assets/scss/**/*.scss', ['sass']);
  gulp.watch('dist/assets/img/**/*', ['images']);
  gulp.watch('dist/**/*.html', ['html']);
});

// =====================================
// Default Task
// =====================================

gulp.task('default', ['copy', 'sass', 'scripts', 'images', 'html', 'browser-sync', 'watch']);
