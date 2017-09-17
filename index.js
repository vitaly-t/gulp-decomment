'use strict';

const through = require('through2');
const decomment = require('decomment');
const PluginError = require('gulp-util').PluginError;

function main(options, func) {
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            cb(new PluginError('gulp-decomment', 'Streaming not supported.'));
        }
        file.contents = new Buffer(func(file.contents.toString(), options));
        this.push(file);
        return cb();
    });
}

function gulpDecomment(options) {
    return main(options, decomment);
}

gulpDecomment.text = function (options) {
    return main(options, decomment.text);
};

gulpDecomment.html = function (options) {
    return main(options, decomment.html);
};

module.exports = gulpDecomment;
