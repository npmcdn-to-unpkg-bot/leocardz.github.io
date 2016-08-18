const gulp = require("gulp");
const del = require("del");
const uglify = require("gulp-uglify");
const pug = require("gulp-pug");
const replace = require("gulp-ext-replace");
const sass = require('gulp-sass');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const gulpsync = require('gulp-sync')(gulp);
const tsProject = ts.createProject('./tsconfig.json', { sortOutput: true });
const path = require('path');
const Builder = require('systemjs-builder');

// ----------

// Register view tasks
gulp.task("component-views", function buildHTML() {
    return gulp.src("./core/app/**/*.component.pug")
        .pipe(replace(".html"))
        .pipe(pug({}))
        .pipe(gulp.dest("./dist/app"))
});

gulp.task("views", function buildHTML() {
    return gulp.src("./core/*.pug")
        .pipe(replace(".html"))
        .pipe(pug({}))
        .pipe(gulp.dest("./"))
});

// ----------

// ----------

// Register scss task
gulp.task('sass', function () {
    return gulp.src('./core/assets/stylesheets/unified.scss')
        .pipe(sass({ compress: true }))
        .pipe(gulp.dest('./dist/assets/stylesheets/'));
});

// ----------

// ----------

// Register images task
gulp.task('images', function () {
    return gulp.src('./core/assets/**/images/**/*.*')
        .pipe(gulp.dest('./dist/assets/'));
});

// ----------

// ----------

// Node Modules copy
gulp.task("clear-all", function () {
    return del("./dist/**/*");
});

gulp.task("clear-libs", function () {
    return del("./dist/libs/**/*");
});

gulp.task("copy-libs", function () {
    return gulp.src(
        [
            "node_modules/**/marked/**/*.*",

            "node_modules/**/animate.css/**/*.*",

            "node_modules/**/angular2-moment/**/*.*",

            "node_modules/**/font-awesome/**/*.*",

            "node_modules/**/bootstrap/**/dist/**/*.*",

            "node_modules/**/jquery/**/dist/**/*.*",

            "node_modules/**/angular2-moment/**/*.*",
            "!node_modules/**/angular2-moment/**/*.ts",

            "node_modules/**/moment/**/*.*",
            "!node_modules/**/moment/**/*.ts",

            "node_modules/**/@angular/**/*.*",
            "!node_modules/**/@angular/**/*.ts",

            "node_modules/**/rxjs/**/*.*",
            "!node_modules/**/rxjs/**/*.ts",

            "node_modules/**/core-js/client/shim.min.js",

            "node_modules/**/zone.js/dist/zone.js",

            "node_modules/**/reflect-metadata/Reflect.js",

            "node_modules/**/systemjs/dist/system.src.js"
        ]
    )
        .pipe(gulp.dest("./dist/libs"));
});

// ----------

// ----------

// Script minify
gulp.task("scripts", function () {
    return gulp.src("./core/**/*.js")
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest("./dist"));
});

// ----------

// ----------

// Register watch task
gulp.task("watch", ["build"], function () {

    gulp.watch("./core/**/*.ts", ["typescripts", "bundle"]);
    gulp.watch("./core/**/*.pug", ["component-views", "views"]);
    gulp.watch("./core/**/*.js", ["scripts"]);
    gulp.watch('./core/**/*.scss', ['sass']);

});

// ----------


// ----------

// Register typescript task
gulp.task('typescripts', function () {
    var tsResult = tsProject.src().pipe(ts(tsProject));
    return tsResult.js
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/app'));
});

// ----------

// ----------

/** then bundle */
gulp.task('bundle', ["typescripts"], function () {

    var builder = new Builder('', 'dist/app/systemjs.config.js');

    return builder
        .buildStatic('dist/app/main.js', 'dist/app/bundle.js', { minify: true, sourceMaps: true })
        .then(function () {
            console.log('Build complete');
        })
        .catch(function (err) {
            console.log('Build error');
            console.log(err);
        });
});


// ----------


// ----------

// Register build tasks
gulp.task("build", gulpsync.sync([
    "clear-all",
    "copy-libs",
    "images",
    "sass",
    "views",
    "component-views",
    "scripts",
    "bundle"
]));

gulp.task("build-skip-copy", gulpsync.sync([
    "images",
    "sass",
    "views",
    "component-views",
    "scripts",
    "bundle"
]));

// ----------

// Register default task
gulp.task("default", [
    "watch"
]);