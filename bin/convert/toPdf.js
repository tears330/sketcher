const phantomjs = require('phantomjs-prebuilt');
const path = require('path');
const childprocess = require('child_process');

const util = require('../lib/util');
const toHtml = require('./toHtml');

class toPdf {
    constructor(jsonPath, theme) {
        
        var htmlStr = toHtml(jsonPath, theme, true);

        var options = {
                viewPortSize: {
                    width: 768,
                    height: 1200
                },
                paperSize: {
                    format: 'A4',
                    orientation: 'portrait',
                    margin: '0px'
                },
                fileName: '/index.pdf'
            };

        this.res = { htmlStr, options };
    }

    exec(callback) {

        var child = childprocess.spawn('phantomjs', [path.join(__dirname, '..', 'lib', 'pdf.js')]),
            stdout = [],
            stderr = [];

        var exitHandler = (err, data) => {
            if (err) return callback(err);
            callback(null, data);
        }

        child.stdout.on('data', (buffer) => {
            stdout.push(buffer);
        });

        child.stderr.on('data', (buffer) => {
            stderr.push(buffer);
            child.stdin.end();
            child.kill();
        });

        child.on('error', (err) => {
            exitHandler(err);
        });

        child.on('exit', (code) => {
            if (code || stderr.length) {
                var err = new Error(Buffer.concat(stderr).toString() || 'pdf: Unknown Error');
                return exitHandler(err);
            } else {
                var buffer = Buffer.concat(stdout).toString(),
                    data = (buffer != null) ? buffer.trim() : undefined;
                return exitHandler(null, JSON.parse(data));
            }
        });

        child.stdin.write(JSON.stringify(this.res), 'utf8');
    }
};


module.exports = toPdf;