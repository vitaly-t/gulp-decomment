'use strict';

var decomment = require('../');
var util = require('gulp-util');
var stream = require('stream');

////////////////////////
// Positive tests;
describe("Positive:", function () {
    it('should decomment', function (done) {
        var fakeFile = getBuffer('/*! special */ js code /* normal */');
        var stream = decomment();
        stream.once('data', function (newFile) {
            var data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe(" js code ");
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

    it('should decomment safely', function (done) {
        var fakeFile = getBuffer('/*! special */ js code /* normal */');
        var stream = decomment({safe: true});
        stream.once('data', function (newFile) {
            var data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe("/*! special */ js code ");
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

    it('should decomment text', function (done) {
        var fakeFile = getBuffer('cssClass{color:Red;}// comments');
        var stream = decomment.text();
        stream.once('data', function (newFile) {
            var data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe("cssClass{color:Red;}");
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

    it('should decomment html', function (done) {
        var fakeFile = getBuffer('\<html><body><!-- comment --><div>test</div><!-- comment --></body></html>');
        var stream = decomment.html();
        stream.once('data', function (newFile) {
            var data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe("\<html><body><div>test</div></body></html>");
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

});

////////////////////////
// Negative tests;
describe("Negative:", function () {
    describe("with null buffer", function () {
        it('must return null data', function (done) {
            var fakeFile = getNull();
            var stream = decomment();
            stream.once('data', function (newFile) {
                expect(newFile.contents).toBeNull();
            });
            stream.once('end', done);
            stream.write(fakeFile);
            stream.end();
        });
    });

    describe("with a stream", function () {
        var err;
        it('must throw an error', function (done) {
            try {
                var fakeFile = getStream();
                var stream = decomment();
                stream.write(fakeFile); // this will throw an error;
            } catch (e) {
                err = e;
                done();
            }
            expect(err instanceof util.PluginError);
            expect(err.message).toBe("Streaming not supported.");
        });
    });
});

function getFakeDest(content) {
    return new util.File({
        path: './test/fixture/test.js',
        cwd: './test/',
        base: './test/fixture/',
        contents: content
    });
}

function getBuffer(bufferContent) {
    return getFakeDest(new Buffer(bufferContent));
}

function getNull() {
    return getFakeDest(null);
}

function getStream() {
    return getFakeDest(stream.PassThrough());
}
