#!/usr/bin/env node

const Blog = require('./src/blog');
const path = require('path');
const sitePath = require('./src/sitePath');
const argv = require('minimist')(process.argv.slice(2));

sitePath.setroot(path.join(process.cwd(), argv._[1] || ''));


if (Blog[argv._[0]] != undefined) {
    Blog[argv._[0]](argv._.slice(1));
} else {
    Blog.help();
}

