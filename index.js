var es = require('event-stream');

module.exports = function() {
    'use strict';
    return es.map(function(file, cb) {
        console.log(String(file.contents));
        cb(null, file);
    });
};
