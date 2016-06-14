const path = require('path');
const ncp = require('ncp').ncp;


module.exports = {
    init: function(...options) {
        console.log('init');
        ncp(path.join(__dirname, '../site'), './site', function(err) {console.log(err)});  
    },

    publish: function(...args) {
        require('./publish')(...args);
    },

    generate: function(...args) {
        require('./generate')(...args);
    },

    help: function() {},

    exampleGen: function() {}

}

