# gulp-html-compile

> Compile static ( no logic ) HTML templates into javascript files

## Synopsis

This plugin is heavily inspired by [Emanuele Ingrosso](https://github.com/ingro)'s gulp plugin which was itself inspired by [Sindre Sorhus](https://github.com/sindresorhus)'s [gulp-nunjucks](https://github.com/sindresorhus/gulp-nunjucks) plugin.

## Install

Install with [npm](https://www.npmjs.org/package/gulp-html-compile)

```javascript
npm install gulp-html-compile --save-dev
```

## Example

### template

```html
<h1 class="my-header">Welcome to my awesome site!</h1>
```

### gulpfile

```javascript
var gulp = require( 'gulp' ),
    template = require( 'gulp-html-compile' ),
    concat = require( 'gulp-concat' ),
    wrap = require( 'gulp-wrap' );

gulp.task( 'templates', function() {
    gulp.src( './templates/**/*.html' )
        .pipe( template({
            name: function( file ) {
                return file.relative.split( '.' )[ 0 ];
            },
            namespace: 'myTemplates'
        }))
        .pipe( concat( 'myTemplates.js' ))
        .pipe( wrap( 'module.exports = window["myTemplates"]'))
        .pipe( gulp.dest( './js/'));
});
```

## API

### template( options )

#### options

Type: `object`

##### options.name

Type: `string`
Default: *Relative template path*
Example: `templates/header.html`

You can override the default behavior by supplying a function which gets the current File object and is expected to return the name.

```javscript
{
    name: function( file ) {
        return file.relative.split( '.' )[ 0 ];
    }
}
```

##### options.namespace

Type: 'string'
Default: 'templates'

The namespace in which the precompiled templates will be assigned.

```javascript
{
    namespace: 'MyCoolTemplates'
}
```

## License

[MIT](http://github.com/mike-engel/gulp-html-compile/blob/master/license.md)
