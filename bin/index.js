#!/usr/bin/env node

const yargs = require('yargs');
const co = require('co');

const toHtml = require('./convert/toHtml');
const toPdf = require('./convert/toPdf');
const init = require('./command/init');

var argv = yargs
    .usage('Usage: sketch <command> [options]')
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
    .epilog('吊的不行')
    .example('sketch init', 'Init a resume.json in current dic')
    .example('sketch -c resume.json -t basic', 'Use basic theme to build your resume.html')
    .argv;

// console.log(argv)

// argv.c && toHtml(process.cwd() + '/' + argv.c, argv.t);
if (argv.c) {
    co(toHtml(process.cwd() + '/' + argv.c, argv.t, false));
}

if (argv.p) {
    co(toHtml(process.cwd() + '/' + argv.p, argv.t, true))
        .then((res) => {
            var pdf = new toPdf(res, 'index.pdf');
            pdf.exec((err, data) => {
                if (err) return console.log(err);
                console.log(data);
            });
        });
}

// // 默认展示帮助信息
(process.argv.length === 2) && yargs.showHelp();