#!/usr/bin/env node

const yargs = require('yargs');

const toHtml = require('./convert/toHtml');
const init = require('./command/init');

var argv = yargs
    .usage('Usage: resumer -c resume.json -t basic')
    .command('init', 'Init your resume.json file', (yargs) => {
        init();
    })
    .option('c', {
        alias: 'convert',
        describe: 'convert resume.json to html',
        type: 'string'
    })
    .option('p', {
        alias: 'pdf',
        describe: 'convert resume.json to pdf',
        type: 'string'
    })
    .option('t', {
        alias: 'theme',
        describe: 'choose a theme for resume',
        type: 'string',
        default: 'basic'
    })
    .help('h')
    .alias('h', 'help')
    .argv;

// console.log(argv)

argv.c && toHtml(process.cwd() + '/' + argv.c, argv.t);

// // 默认展示帮助信息
(process.argv.length === 2) && yargs.showHelp();