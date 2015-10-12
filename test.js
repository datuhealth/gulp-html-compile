'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var tpl = require('./gulp-html-compile');

it('should precompile html templates', function(cb) {

    var stream = tpl();

    stream.on('data', function (file) {
        assert.equal(file.path, __dirname + '\/fixture\/fixture.js');
        assert.equal(file.relative, 'fixture\/fixture.js');
        assert(/["templates"]/.test(file.contents.toString()));
        assert(/["fixture\/fixture.html"]/.test(file.contents.toString()));
        cb();
    });

    stream.write(new gutil.File({
        base: __dirname,
        path: __dirname + '/fixture/fixture.html',
        contents: new Buffer('<h1>Hello world</h1>')
    }));
});

it('should support supplying custom name in a callback', function (cb) {

    var stream = tpl(
    {
        name: function (file) {
            return 'custom';
        }
    });

    stream.on('data', function (file) {
        assert(/{}\)\["custom"]/.test(file.contents.toString()));
        cb();
    });

    stream.write(new gutil.File({
        base: __dirname,
        path: __dirname + '/fixture/fixture.html',
        contents: new Buffer('<h1>Hello world</h1>')
    }));
});

it('should support supplying a custom namespace', function (cb) {

    var stream = tpl(
    {
        namespace: 'customNS',
    });

    stream.on('data', function (file) {
        assert(/window\["customNS"\]/.test(file.contents.toString()));
        cb();
    });

    stream.write(new gutil.File({
        base: __dirname,
        path: __dirname + '/fixture/fixture.html',
        contents: new Buffer('<h1>Hello world</h1>')
    }));
});
