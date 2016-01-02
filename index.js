'use strict';

var through = require('through2');
var util = require('gulp-util');
var decomment = require('decomment');
var PluginError = util.PluginError;

var PLUGIN_NAME = 'gulp-decomment';

function main(options, func) {

    var opts = options || {};

    var stream = through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
            return;
        }
        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported.'));
        }
        file.contents = new Buffer(func(file.contents.toString(), opts));
        this.push(file);
        return cb();
    });

    return stream;
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
