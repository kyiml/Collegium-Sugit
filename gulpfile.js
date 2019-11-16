const MODULE_gulp = require('gulp');
const MODULE_webpack = require('webpack-stream');
const MODULE_nodemon = require('gulp-nodemon');
const MODULE_eslint = require('gulp-eslint');

const lint_task = (done) => {
    MODULE_gulp.src(['./server/*.js'])
    .pipe(MODULE_eslint())
    .pipe(MODULE_eslint.format())
    .pipe(MODULE_eslint.failAfterError());
    done();
};

const webpack_task = (done) => {
    MODULE_webpack(require('./webpack.config.js'))
    .pipe(MODULE_gulp.dest('./'));
    done();
};

const watch = (done) => {
    MODULE_nodemon({
        script: './server/app.js',
        ignore: ['./hosted', './views/', './node_modules/'],
        ext: 'js'
    });
    done();
};

const run = (done) => {
    MODULE_gulp.parallel(lint_task, webpack_task);
}

// TODO: integrate these commands as part of the gulpfile
// "mongo": "sudo mongod -dbpath CollegiumSugit & sleep 2; mongo CollegiumSugit"
// "redis": "redis"

module.exports.build = MODULE_gulp.parallel(lint_task, webpack_task);
module.exports.watch = watch;