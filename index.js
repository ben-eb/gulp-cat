var Stream = require('stream');

module.exports = function() {
    'use strict';
    var stream = new Stream.Transform({objectMode: true});
    stream._transform = function(file, unused, done) {
      // When null just pass through
      if(file.isNull()) {
        this.push(file); done();
        return;
      }
    
      if(file.isBuffer()) {
        process.stdout.write(file.contents);
      } else {
        file.contents = file.contents.pipe(new Stream.PassThrough());
        file.contents.pipe(process.stdout);
      }

      this.push(file);
      done();
    };
    return stream;
};
