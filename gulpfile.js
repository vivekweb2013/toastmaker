// For creating tasks, Refer - https://gulpjs.com/docs/en/getting-started/creating-tasks
const { series, parallel } = require('gulp');
const { src, dest } = require('gulp');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const zip = require('gulp-zip');
const projectVersion = require('./package.json').version;

const SOURCE_PATH = 'src/';
const DISTRIBUTABLE_PATH = 'dist/';
const BUILD_PATH = 'build/';

function cleanDist() {
    return src(DISTRIBUTABLE_PATH, { read: false, allowEmpty: true }).pipe(clean());
}

function cleanBuild() {
    return src(BUILD_PATH, { read: false, allowEmpty: true }).pipe(clean());
}

function buildScripts() {
    // store both minified and unminified scrips to dist
    return src(`${SOURCE_PATH}/*.js`)
        .pipe(babel())
        .pipe(dest(DISTRIBUTABLE_PATH))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(dest(DISTRIBUTABLE_PATH));
}

function buildCss() {
    // store both minified and unminified css to dist
    return src(`${SOURCE_PATH}/*.css`)
        .pipe(dest(DISTRIBUTABLE_PATH))
        .pipe(minifyCss())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(dest(DISTRIBUTABLE_PATH));
}

function generatePackage() {
    // mainly created for ci, so that package can be uploaded to release
    // store the package in the build dir and not in the dist
    // since dist dir is used in npm publish

    return src(`${DISTRIBUTABLE_PATH}/**/*`)
        .pipe(zip(`toastmaker-v${projectVersion}.zip`))
        .pipe(dest(BUILD_PATH));
}

exports.clean = parallel(cleanDist, cleanBuild);

exports.build = series(cleanDist, parallel(buildScripts, buildCss));

exports.package = series(cleanBuild, exports.build, generatePackage);

exports.default = exports.build // default should not generate package.