'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var decomment = require('decomment');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-decomment';

function gulpDecomment(options) {

    var opts = options || {};

    var stream = through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }

        if (file.isBuffer()) {
            file.contents = new Buffer(decomment(file.contents.toString(), opts));
        }

        this.push(file);

        return cb();
    });

    return stream;
}

gulpDecomment.text = function (options) {

    var opts = options || {};

    var stream = through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }

        if (file.isBuffer()) {
            file.contents = new Buffer(decomment.text(file.contents.toString(), opts));
        }

        this.push(file);

        return cb();
    });

    return stream;
}

gulpDecomment.html = function (options) {

    var opts = options || {};

    var stream = through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }

        if (file.isBuffer()) {
            file.contents = new Buffer(decomment.html(file.contents.toString(), opts));
        }

        this.push(file);

        return cb();
    });

    return stream;
}


module.exports = gulpDecomment;
