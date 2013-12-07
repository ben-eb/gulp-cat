# gulp-cat

Echo the contents of files to the console. Great for ASCII art, banners and important documentation. Inspired by https://npmjs.org/package/grunt-cat

## Installation

Install via npm:

```
npm install gulp-cat --save-dev
```

## Example

```
var gulp = require('gulp');
var cat  = require('gulp-cat');

gulp.task('default', function() {
    gulp.src('./README.md')
        .pipe(cat());
});
```
