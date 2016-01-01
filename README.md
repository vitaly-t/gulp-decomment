gulp-decomment
==============

> [decomment](https://github.com/vitaly-t/decomment/) - Removes comments from JSON, JavaScript, CSS and HTML.

## Install

```sh
$ npm install --save-dev gulp-decomment
```

## Usage

```js
var gulp = require('gulp');
var decomment = require('gulp-decomment');

gulp.task('default', function () {
  return gulp.src('template.js')
    .pipe(decomment())
    .pipe(gulp.dest('dist'));
});
```

## API

### decomment[options])

##### options.trim ⇒ Boolean
* `false (default)` - do not trim comments
* `true` - remove empty lines that follow removed full-line comments

##### options.safe ⇒ Boolean
* `false (default)` - remove all multi-line comments
* `true` - keep multi-line comments that start with `/*!`

### decomment.text([options]) ⇒ String

Unlike the default **decomment**, it instructs the library that `text` is not
a JSON, JavaScript or HTML, rather a plain text that needs no parsing or validation,
only to remove `//` and `/**/` comments from it according to the `options`.

CSS is the most frequent example of where this method is to be used.

Please note that while comment blocks located inside `''`, `""` or \`\` are not removed,
the same as for JSON or JavaScript, you should not use this method for JSON or JavaScript,
as it can break your regular expressions.

### decomment.html([options]) ⇒ String

Unlike the default **decomment** method, it instructs the library not to parse
or validate the input in any way, rather assume it to be HTML, and remove all
`<!-- comment -->` entries from it according to the `options`.

## License

Copyright © 2016 [Vitaly Tomilov](https://github.com/vitaly-t);
Released under the MIT license.
