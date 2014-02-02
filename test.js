/* jshint node: true */
/* global describe, it */

'use strict';

var assert = require('assert'),
    es = require('event-stream'),
    gutil = require('gulp-util'),
    PassThrough = require('stream').PassThrough,
    cat = require('./index');


describe('gulp-cat', function() {
    it('should work in buffer mode', function(done) {
        var stream = cat();
        var fakeBuffer = new Buffer("wadup");
        var fakeFile = new gutil.File({
            contents: fakeBuffer
        });

        var fakeBuffer2 = new Buffer("doe");
        var fakeFile2 = new gutil.File({
            contents: fakeBuffer2
        });

        stream.on('data', function(newFile) {
            if (newFile === fakeFile) {
                assert.equal(fakeBuffer, newFile.contents);
            } else {
                assert.equal(fakeBuffer2, newFile.contents);
            }
        });

        stream.on('end', function() {
            done();
        });

        stream.write(fakeFile);
        stream.write(fakeFile2);
        stream.end();
    });

    it('should work in stream mode', function(done) {
        var stream = cat();
        var fakeStream = new PassThrough();
        var fakeFile = new gutil.File({
            contents: fakeStream
        });
        fakeStream.write(new Buffer("wa"));
        fakeStream.write(new Buffer("dup"));
        fakeStream.end();

        var fakeStream2 = new PassThrough();
        var fakeFile2 = new gutil.File({
            contents: fakeStream2
        });
        fakeStream2.write(new Buffer("do"));
        fakeStream2.write(new Buffer("e"));
        fakeStream2.end();

        stream.on('data', function(newFile){
            if (newFile === fakeFile) {
                newFile.pipe(es.wait(function(err, data) {
                    assert.equal("wadup", data);
                }));
            } else {
                newFile.pipe(es.wait(function(err, data) {
                    assert.equal("doe", data);
                }));
            }
        });

        stream.on('end', function() {
            done();
        });

        stream.write(fakeFile);
        stream.write(fakeFile2);
        stream.end();
    });

    it('should let null files pass through', function(done) {
        var stream = cat(),
            n = 0;
        stream.pipe(es.through(function(file) {
            assert.equal(file.path, 'null.md');
            assert.equal(file.contents,  null);
            n++;
        }, function() {
            assert.equal(n, 1);
            done();
        }));
        stream.write(new gutil.File({
            path: 'null.md',
            contents: null
         }));
        stream.end();
    });
});
