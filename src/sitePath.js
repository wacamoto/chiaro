var path = require('path');

module.exports = {
    setroot: function(str) {
        for (let i in this) {
            if (typeof this[i] == 'string') this[i] = path.join(str, this[i]);
        }
    },
    rootpath:       '.',
    markdown:       './markdown',
    articles:       './articles',
    jsonfile:       './jsonfile',
    articlesJson:   './jsonfile/articles.json',
    searchJson:     './jsonfile/search.json',
    authorJson:     './jsonfile/author.json',
    modifyJson:     './jsonfile/modify.json',
    template:       './template',
    indexTpl:       './template/index.html',
    authorTpl:      './template/author.html',
    searchTpl:      './template/search.html',
    articlesTpl:    './template/articles.html',
}
