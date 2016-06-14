var assert = require('chai').assert;
var helper = require('../src/helper.js');


describe('helper', function() {
    describe('objToList', function() {
        it('', function() {
            var obj = {
                'A': {
                    'a': '1',
                    'b': '2'
                },

                'B': {
                    'a': '1',
                    'b': {
                        '1': '12'
                    }
                }
            }
            var list = [
                './A',
                {'./A/a': '1'},
                {'./A/b': '2'},
                './B',
                {'./B/a': '1'},
                './B/b',
                {'./B/b/1': '12'}
            ]
            assert.deepEqual(helper.objToList(obj), list);
        })
    })
})

