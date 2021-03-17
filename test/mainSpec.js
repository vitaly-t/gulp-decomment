'use strict';

const decomment = require('../');
const Vinyl = require('vinyl');
const PluginError = require('plugin-error');
const stream = require('stream');

////////////////////////
// Positive tests;
describe('Positive:', () => {
    it('should decomment', done => {
        const fakeFile = getBuffer('/*! special */ js code /* normal */');
        const stream = decomment();
        stream.once('data', newFile => {
            const data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe(' js code ');
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

    it('should decomment safely', done => {
        const fakeFile = getBuffer('/*! special */ js code /* normal */');
        const stream = decomment({safe: true});
        stream.once('data', newFile => {
            const data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe('/*! special */ js code ');
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

    it('should decomment text', done => {
        const fakeFile = getBuffer('cssClass{color:Red;}// comments');
        const stream = decomment.text();
        stream.once('data', newFile => {
            const data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe('cssClass{color:Red;}');
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

    it('should decomment html', done => {
        const fakeFile = getBuffer('<html><body><!-- comment --><div>test</div><!-- comment --></body></html>');
        const stream = decomment.html();
        stream.once('data', newFile => {
            const data = newFile.contents;
            expect(data).toBeTruthy();
            expect(data.toString()).toBe('<html><body><div>test</div></body></html>');
        });
        stream.once('end', done);
        stream.write(fakeFile);
        stream.end();
    });

});

////////////////////////
// Negative tests;
describe('Negative:', () => {
    describe('with null buffer', () => {
        it('must return null data', done => {
            const fakeFile = getNull();
            const stream = decomment();
            stream.once('data', newFile => {
                expect(newFile.contents).toBeNull();
            });
            stream.once('end', done);
            stream.write(fakeFile);
            stream.end();
        });
    });

    describe('with a stream', () => {
        let err;
        it('must throw an error', done => {
            try {
                const fakeFile = getStream();
                const stream = decomment();
                stream.write(fakeFile); // this will throw an error;
            } catch (e) {
                err = e;
                done();
            }
            expect(err instanceof PluginError);
            expect(err.message).toBe('Streaming not supported.');
        });
    });
});

function getFakeDest(content) {
    return new Vinyl({
        path: './test/fixture/test.js',
        cwd: './test/',
        base: './test/fixture/',
        contents: content
    });
}

function getBuffer(bufferContent) {
    return getFakeDest(Buffer.from(bufferContent));
}

function getNull() {
    return getFakeDest(null);
}

function getStream() {
    return getFakeDest(new stream.PassThrough());
}
