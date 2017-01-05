const fs = require('fs');
const readline = require('readline');
const path = require('path');
const less = require('less');
const minify = require('html-minifier').minify;

const Util = {
    getFile: (filePath) => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                (!err && data) ? resolve(data): reject(err);
            });
        });
    },
    writeFile: (filePath, data) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(process.cwd() + filePath, data, (err, data) => {
                !err ? resolve(data) : reject(err);
            });
        });
    },
    questionSync: (query) => {
        return new Promise((resolve, reject) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            rl.question(query, (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    },
    isExist: (path) => {
        return new Promise((resolve, reject) => {
            fs.stat(path, function (err, stat) {
                stat && stat.isFile() ? resolve(true) : resolve(false);
            });
        });
    },
    bundleHtml: (html, type, content) => {
        type === 'css' && (html = html.replace('</head>', `<style>${content}</style></head>`));
        type === 'js' && (html = html.replace('</body>', `<script>${content}</script></body>`));

        if (type === 'less') {
            less.render(content, (err, css) => {

                if (err) {
                    console.log(err);
                    return;
                } else {
                    html = html.replace('</head>', `<style>${css.css}</style></head>`);
                    return html;
                }
            })
        }

        return html;
    },
    htmlMin: (htmlStr) => {
        return minify(htmlStr, {
            removeAttributeQuotes: true,
            minifyCSS: true,
            collapseWhitespace: true,
            removeComments: true
        });
    }
}

module.exports = Util;