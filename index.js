var map = require('map-stream');

module.exports = function() {
    'use strict';
    return map(function(file, cb) {
        console.log(String(file.contents));
        cb(null, file);
    });
};
