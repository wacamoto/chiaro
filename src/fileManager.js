const fs = require('fs');
const sitePath = require('./sitePath');


module.exports = {

    files: {
        articles: undefined,
        search: undefined,
        author: undefined,
        modify: undefined
    },

    getArticles: function() {
        if (this.files.articles == undefined) {
            this.files.articles = new F(sitePath.articlesJson);
        }
        return this.files.articles;
    },

    getSearch: function() {
        if (this.files.search == undefined) {
            this.files.search = new F(sitePath.searchJson); 
        }
        return this.files.search;
    },

    getAuthor: function() {
        if (this.files.author == undefined) {
            this.files.author = new F(sitePath.authorJson);
        }
        return this.files.author;
    },
    
    getModify: function() {
        if (this.files.modify == undefined) {
            this.files.modify = new F(sitePath.modifyJson);
        }
        return this.files.modify;
    },
}

class F {
    constructor(path) {
        this.path = path;

        try {
            this.data = require(path);
        } catch(err) {
            this.data = {};
        }
    }

    save() {
        let data = JSON.stringify(this.data, null, 4);
        fs.writeFile(this.path, data, 'utf8', {flag: 'w'});
    }
}

