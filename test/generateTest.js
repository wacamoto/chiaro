var assert = require('chai').assert;
var Generate = require('../src/generate.js');
var generate = new Generate();

describe('generate', function() {

    var a = {
        'a': {'name': 'a', 'birthtime':'1', 'mtime': '1'},
        'b': {'name': 'b', 'birthtime':'1', 'mtime': '1'},
        'c': {'name': 'c', 'birthtime':'1', 'mtime': '1'},
    }
    var b = {
        'b': {'name': 'b', 'birthtime':'1', 'mtime': '1'},
        'c': {'name': 'c', 'birthtime':'1', 'mtime': '2'},
        'd': {'name': 'd', 'birthtime':'1', 'mtime': '1'},
    }
    var c = b;
    let diff = generate.getDiff(a, b);
    let res = generate.update(c, a, diff);
    
    describe('getDiff()', function() {
        it('', function() {

            assert.deepEqual(diff, {
                create: {'a': {'name': 'a', 'birthtime':'1', 'mtime': '1'}},
                modify: {'c': {'name': 'c', 'birthtime':'1', 'mtime': '1'}},
                remove: {'d': {'name': 'd', 'birthtime':'1', 'mtime': '1'}}
            })
        })
    })

    describe('update()', function() {

        it('', function() {
            assert.deepEqual(res, {
                'a': {'name': 'a','birthtime':'1', 'mtime': '1'},
                'b': {'name': 'b','birthtime':'1', 'mtime': '1'},
                'c': {'name': 'c','birthtime':'1', 'mtime': '1'},
            });
        })
    })
})
