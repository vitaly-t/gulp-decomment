'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var decomment = require('decomment');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-decomment';

function gulpDecomment() {

    var stream = through.obj(function (file, enc, cb) {

        if (file.isNull()) {
            cb(null, file);
            return;
        }

        if (file.isStream()) {
            cb(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return;
        }
        /*
         if (noopt || (!block && !line)) {
         strip = stripComments;
         } else if (block && line) {
         this.emit('error', new PluginError(PLUGIN_NAME, 'Please choose either block or line, not both!'));
         } else if (block) {
         strip = stripComments.block;
         } else if (line) {
         strip = stripComments.line;
         } else {
         this.emit('error', new PluginError(PLUGIN_NAME, 'Please define options correctly'));
         }
         */
        if (file.isBuffer()) {
            file.contents = new Buffer(decomment(file.contents.toString()));
        }

        this.push(file);

        return cb();
    });

    return stream;
}

module.exports = gulpDecomment;
