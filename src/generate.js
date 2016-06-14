const fs = require('fs');
const path = require('path');
const swig = require('swig');
const mark = require('marked');
const clone = require('clone');
const dir = require('node-dir');

const sitePath = require('./sitePath');
const fileManager = require('./fileManager'); 

swig.setDefaults({ autoescape: false });


module.exports = function() {

    let articles = getArticles();
    getStatus().then(function(stat) {
        let diff = getDiff(stat, articles);
        compiler(diff).then(function() {
            console.log('compiler done')
        }, function(err) {console.log(err)});
        articles = update(articles, stat, diff);
        storeJson(articles);

    }).catch(function(err) {
        console.log(err)
    })
    

    function getStatus() {

        return new Promise(function(resolve) {
            dir.files(sitePath.markdown, function(err, files) {
                for (i in files) {
                    if (! files[i].match(/.md$/) ) files.splice(i, 1); 
                }

                Promise.all(gen(files)).then(function(stats) {
                    let re = {};
                    for (let i in stats) {
                        re[stats[i].name] = stats[i];
                    }
                    resolve(re);
                })
            })
        })

        function gen (files) {
            return files.map(function(path) {
                return new Promise(function(resolve) {
                    fs.stat(path, function(err, stat) {
                        var name = path.split('/');
                        stat.name = name[name.length - 1];
                        resolve(stat);
                    })
                })
            })
        }
    }


    this.getDiff = function(stat, articles) {

        let statClone = clone(stat);
        let articlesClone = clone(articles);
        let modify = {};

        for (let i in statClone) {
            if (articlesClone[i] !== undefined) {
                let statTime = new Date(statClone[i].mtime).getTime(); 
                if (statTime !== articlesClone[i].mtime) {
                    modify[i] = articlesClone[i];
                    modify[i].mtime = statClone[i].mtime.getTime();
                }
                delete statClone[i];
                delete articlesClone[i];
            }
        }

        return {create: statClone, modify: modify, remove: articlesClone}
    }


    function compiler(diff) {
        let tpl = swig.compileFile(sitePath.articlesTpl);

        return Promise.all(compiler(diff.create)).then(function(resolve) {
            return Promise.all(compiler(diff.modify));
        });

        function * compiler(files) {
            for (let i in files) {
                yield new Promise(function(resolve, reject) {
                    fs.readFile(path.join(sitePath.markdown, files[i].name), function(err, data) {
                        let md = data.toString();
                        //let detail = getDetail(md);
                        md = removeDetail(md);
                        let markdown = mark(md);
                        let html = tpl({markdown: markdown});
                        let name = i.split('.')[0] + '.html';
                        fs.writeFile(path.join(sitePath.articles ,name), html, 'utf8', {flag: 'w'});
                        resolve();
                        reject(err);
                    })
                })
            }
        }

        function getDetail(md) {
            let result = {};
            let regex = /---detail---(.|\r|\n)+---detail---/;
            //let detail = md.match(regex)[0];
            detail = detail.slice(12, detail.length - 12);
            let val = detail.split(/\n\w+=/);
            val.splice(0, 1);
            let key = detail.match(/\n\w+=/g);

            for (let i in key) {
                result[key[i].slice(1, key[i].length - 1)] = val[i];
            }
            return result;
        }

        function removeDetail(md) {
            let regex = /---detail---(.|\r|\n)+---detail---/;
            return md.replace(regex, '');
        }
    }
    
    
    this.update = function(articles, stat, diff) {

        for (let i in diff.remove) {
            delete articles[i];
        }
        for (let i in diff.create) {
            articles[i] = {
                name: diff.create[i].name,
                birthtime: diff.create[i].birthtime,
                mtime: diff.create[i].mtime.getTime(),
            }
        }
        for (let i in diff.modify) {
            articles[i].mtime = diff.modify[i].mtime;
        }
        return articles;
    }
    
    function getArticles() {
        return fileManager.getArticles().data;
    }

    function storeJson(articles) {
        let f = fileManager.getArticles();
        f.data = articles;
        f.save();
    }
}

