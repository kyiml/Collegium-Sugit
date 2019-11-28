const MODULE_gulp = require('gulp');
const MODULE_gulp_if = require('gulp-if');
const MODULE_webpack = require('webpack-stream');
const MODULE_nodemon = require('gulp-nodemon');
const MODULE_eslint = require('gulp-eslint');

const lint_is_fixed = (file) => {
    return file.eslint != null && file.eslint.fixed;
};

const lint_task = (done) => {
    MODULE_gulp.src(['./server/*.js'])
    .pipe(MODULE_eslint({fix: true}))
    .pipe(MODULE_eslint.format())
    .pipe(MODULE_gulp_if(lint_is_fixed, MODULE_gulp.dest('./server')));
    done();
};

const webpack_task = (done) => {
    MODULE_webpack(require('./webpack.config.js'))
    .pipe(MODULE_gulp.dest('./hosted/generated'));
    done();
};

const watch = (done) => {
    MODULE_nodemon({
        script: './server/app.js',
        watch: ['./server', './views/react', './hosted/static/scss'],
        ext: 'js jsx scss'
    }).on('restart', ['build']);
    done();
};

// TODO: integrate these commands as part of the gulpfile
// "mongo": "sudo mongod -dbpath CollegiumSugit & sleep 2; mongo CollegiumSugit"
// "redis": "redis"

module.exports.build = MODULE_gulp.parallel(lint_task, webpack_task);
module.exports.watch = watch;