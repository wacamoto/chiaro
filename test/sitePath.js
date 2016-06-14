var assert = require('chai').assert;
var sitePath = require('../src/site');


describe('sitePath', function() {
    describe('rootPath()', function() {
        sitePath.setroot('/root');
        it('', function() {
            assert.equal(sitePath.rootpath, '/root');
            assert.equal(sitePath.markdown, '/root/markdown');
            assert.equal(sitePath.searchJson, '/root/jsonfile/search.json');
        })
    })
})
