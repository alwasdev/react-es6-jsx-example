var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var filter = require('gulp-filter');
var newer = require('gulp-newer');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var cache = require('gulp-cache');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var onError = function (err) {
    notify.onError({
        title: "Error",
        message: "<%= error %>",
    })(err);
    this.emit('end');
};

var plumberOptions = {
    errorHandler: onError,
};

var jsFiles = {
    vendor: [

    ],
    source: [
        'src/components/*.jsx',
        'src/components/table/*.jsx',
        'src/components/index/*.jsx'
    ]
};

// Lint JS/JSX files
gulp.task('eslint', function () {
    return gulp.src(jsFiles.source)
        .pipe(eslint({
            baseConfig: {
                "ecmaFeatures": {
                    "jsx": true
                }
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Copy react.js and react-dom.js to assets/js/src/vendor
// only if the copy in node_modules is "newer"
gulp.task('copy-react', function () {
    return gulp.src('node_modules/react/dist/react.js')
        .pipe(newer('assets/js/src/vendor/react.js'))
        .pipe(gulp.dest('assets/js/src/vendor'));
});
gulp.task('copy-jquery', function () {
    return gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(newer('assets/js/src/vendor/jquery.js'))
        .pipe(gulp.dest('assets/js/src/vendor'));
});
gulp.task('copy-react-dom', function () {
    return gulp.src('node_modules/react-dom/dist/react-dom.js')
        .pipe(newer('assets/js/src/vendor/react-dom.js'))
        .pipe(gulp.dest('assets/js/src/vendor'));
});
// Copy assets/js/vendor/* to assets/js
gulp.task('copy-js-vendor', function () {
    return gulp
        .src([
            'assets/js/src/vendor/react.js',
            'assets/js/src/vendor/react-dom.js',
            'assets/js/src/vendor/jquery.js',
            'assets/js/components/**/**.*js',
        ])
        .pipe(gulp.dest('assets/js'));
});

// Concatenate jsFiles.vendor and jsFiles.source into one JS file.
// Run copy-react and eslint before concatenating
gulp.task('concat', ['copy-react', 'copy-react-dom', 'copy-jquery', 
], function () {

    var reloadOptions = {
        stream: true,
    };
    return gulp.src(jsFiles.vendor.concat(jsFiles.source))
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015', 'react'],

            compact: false
        }))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/js'))
        .pipe(reload(reloadOptions));
});

// Compile Sass to CSS
gulp.task('sass', function () {
    var autoprefixerOptions = {
        browsers: ['last 2 versions'],
    };

    var filterOptions = '**/*.css';

    var reloadOptions = {
        stream: true,
    };

    var sassOptions = {
        includePaths: [

        ]
    };

    return gulp.src('src/sass/**/*.scss')
        .pipe(plumber(plumberOptions))
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('assets/css'))
        .pipe(filter(filterOptions))
        .pipe(reload(reloadOptions));
});

// Watch JS/JSX and Sass files
gulp.task('watch', function () {
    gulp.watch('src/**/*.{js,jsx}', ['concat']);
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('**/*.html', ['html']);
});

gulp.task('html', function () {
    var reloadOptions = {
        stream: true,
    };
    gulp.src("index.html").pipe(gulp.dest('assets')).pipe(reload(reloadOptions));

})
// BrowserSync
gulp.task('browsersync', function () {
    browserSync({
        injectChanges: true,
        reloadDelay: 750,
        server: {
            baseDir: './assets'
        },
        open: false,
        online: false,
        notify: false,

    });
});

gulp.task('build', [ 'sass', 'copy-js-vendor', 'concat', 'html']);
gulp.task('default', ['build', 'browsersync', 'watch']);
