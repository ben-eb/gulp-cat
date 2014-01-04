var PassThrough = require('stream').PassThrough;

module.exports = function() {
    'use strict';
    var stream = new PassThrough({objectMode: true});
    stream.on('data', function(file) {
      if(file.isNull()) return;
    
      if(file.isBuffer()) {
        process.stdout.write(file.contents);
      } else {
        file.contents.pipe(process.stdout);
        file.contents = file.contents.pipe(new PassThrough());
      }

    });
    return stream;
};
