'use strict';

var assert = require('assert')
  , es = require('event-stream')
  , gutil = require('gulp-util')
  , PassThrough = require('stream').PassThrough
  , cat = require(__dirname + '/../index.js')
;

describe('gulp-cat should work', function() {

  it('in buffer mode', function(done) {

      var stream = cat();
      var fakeBuffer = new Buffer("wadup");
      var fakeFile = new gutil.File({
        contents: fakeBuffer
      });

      var fakeBuffer2 = new Buffer("doe");
      var fakeFile2 = new gutil.File({
        contents: fakeBuffer2
      });

      stream.on('data', function(newFile){
        if(newFile === fakeFile) {
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

  it('in stream mode', function(done) {

      var stream = cat();
      var fakeStream = new PassThrough();
      var fakeFile = new gutil.File({
        contents: fakeStream
      });
      fakeStream.write(Buffer("wa"));
      fakeStream.write(Buffer("dup"));
      fakeStream.end();

      var fakeStream2 = new PassThrough();
      var fakeFile2 = new gutil.File({
        contents: fakeStream2
      });
      fakeStream2.write(Buffer("do"));
      fakeStream2.write(Buffer("e"));
      fakeStream2.end();

      stream.on('data', function(newFile){
        if(newFile === fakeFile) {
          newFile.pipe(es.wait(function(err, data){
            assert.equal("wadup", data);
          }));
        } else {
          newFile.pipe(es.wait(function(err, data){
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

});
