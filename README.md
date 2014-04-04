# gulp-cat [![Build Status](https://travis-ci.org/ben-eb/gulp-cat.svg?branch=master)](https://travis-ci.org/ben-eb/gulp-cat) [![NPM version](https://badge.fury.io/js/gulp-cat.png)](http://badge.fury.io/js/gulp-cat) [![Dependency Status](https://gemnasium.com/ben-eb/gulp-cat.png)](https://gemnasium.com/ben-eb/gulp-cat)

> Echo file(s) to the console.

Echo the contents of files to the console. Great for ASCII art, banners and important documentation. Inspired by https://npmjs.org/package/grunt-cat

## Installation

Install via [npm](https://npmjs.org/package/gulp-cat):

```
npm install gulp-cat --save-dev
```

## Example

```js
var gulp = require('gulp');
var cat  = require('gulp-cat');

gulp.task('default', function() {
    gulp.src('./README.md')
        .pipe(cat());
});
```
