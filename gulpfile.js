// For creating tasks, Refer - https://gulpjs.com/docs/en/getting-started/creating-tasks
const { series, parallel } = require('gulp');
const { src, dest } = require('gulp');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');

const SOURCE_PATH = 'src/';
const DESTINATION_PATH = 'dist/';

function cleanDist() {
    return src(DESTINATION_PATH, { read: false, allowEmpty: true }).pipe(clean());
}

function buildScripts() {
    // store both minified and unminified scrips to dist
    return src(`${SOURCE_PATH}/*.js`)
        .pipe(babel())
        .pipe(dest(DESTINATION_PATH))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest(DESTINATION_PATH));
}

function buildCss() {
    // store both minified and unminified css to dist
    return src(`${SOURCE_PATH}/*.css`)
        .pipe(dest(DESTINATION_PATH))
        .pipe(minifyCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest(DESTINATION_PATH));
}

exports.default = series(cleanDist, parallel(buildScripts, buildCss));