var fs = require('fs.extra');
var helper = {
    objToList: function(obj, path='./') {
        var list = [];
        for (let i in obj) {
            if (typeof obj[i] == 'object') {
                list.push(path  + i);
                list = list.concat(this.objToList(obj[i] , path + i + '/')) ;   
            } else {
                var file = {
                    dist: file[path + i],
                    src: obj[i]
                };
                list.push(file);
            }
        }
        return list;
    },

    listToTree: function(list) {
        for (let i in list) {
            if (typeof list[i] == 'object') {
               fs.copy(list[i]., list[i].src);
            }
            else {
                fs.mkdir(ilist[i])
            }
        }
    }
}

module.exports = helper;
