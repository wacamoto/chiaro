var fs = require('fs');
var rmdir = require('rmdir');
var assert = require('chai');
var blog = require('../src/blog.js');


describe('Blog', function() {
    describe('init', function() {

        before(function() {
            try {
                blog.init('myFirstBlog');
            } catch (e) {
                rmdir('./myFirstBlog');
            }
        });

        it('template folder should be exist', function() {
            checkirectory('./myFirstBlog/template');
        });

        it('template folder should be exist', function() {
            checkirectory('./myFirstBlog/markdown');
        });

        after(function() {
            rmdir('./myFirstBlog');
        });
    });

    describe('git', function() {});
})


function checkirectory(path) {
    fs.stat(path);
}
