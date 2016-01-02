'use strict';

var decomment = require('../');
var util = require('gulp-util');

describe('Main', function () {

    function getFakeFile(fileContent) {
        return new util.File({
            path: './test/fixture/test.js',
            cwd: './test/',
            base: './test/fixture/',
            contents: new Buffer(fileContent || '')
        });
    }

    it('should decomment', function (done) {
        var fakeFile = getFakeFile('/*! special */ js code /* normal */');

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
        var fakeFile = getFakeFile('/*! special */ js code /* normal */');

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
        var fakeFile = getFakeFile('cssClass{color:Red;}// comments');

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
        var fakeFile = getFakeFile('\<html><body><!-- comment --><div>test</div><!-- comment --></body></html>');

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
