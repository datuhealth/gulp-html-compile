'use strict';

var gutil = require( 'gulp-util' );
var through = require( 'through2' );
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-html-compile';

module.exports = function ( options ) {
    options = options || {};

    function compiler( file ) {
        var name = typeof options.name === 'function' && options.name( file ) || file.relative;
        var namespace = options.namespace || 'templates';
        var NSwrapper = '(function() {(window["' + namespace + '"] = window["' + namespace + '"] || {})["' + name.replace( /\\/g, '/' ) +'"] = function() { return "';

        var template = file.contents.toString().split( '\n' ).join( '' ).replace( /\"/g, '\\"');

        return NSwrapper + template + '";};})();';
    }

    var stream = through.obj(function( file, enc, callback ) {

        if ( file.isNull() ) {
            this.push( file );
            return callback();
        }

        if ( file.isStream() ) {
            this.emit( 'error', new PluginError( PLUGIN_NAME, 'Streams are not supported!' ));
            return callback();
        }

        var filePath = file.path;

        try {
            var compiled = compiler( file );

            file.contents = new Buffer( compiled );
            file.path = gutil.replaceExtension( file.path, '.js' );
        } catch ( err ) {
            this.emit( 'error', new PluginError( PLUGIN_NAME, err, {
                fileName: filePath
            }));

            return callback();
        }

        this.push( file );
        callback();
    });

    return stream;
};
