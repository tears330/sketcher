const jucier = require('juicer');
const path = require('path');

const util = require('../lib/util');

const toHtml = (jsonPath, theme) => {
    var modelPath = path.join(__dirname, '..', 'views', theme, 'model.html'),
        cssPath = path.join(modelPath, '..', 'main.css'),
        jsPath = path.join(modelPath, '..', 'main.js');

    Promise.all([util.getFile(jsonPath), util.getFile(modelPath)]).then((success) => {
        var data = JSON.parse(success[0]),
            tpl = success[1],
            htmlStr = jucier(tpl, data);

        util.getFile(cssPath)
            .then((data) => {
                htmlStr = util.bundleHtml(htmlStr, 'css', data);
                return util.getFile(jsPath);
            }, (err) => {
                return util.getFile(jsPath);
            })
            .then((data) => {
                htmlStr = util.bundleHtml(htmlStr, 'js', data);
                return util.writeFile('/index.html', htmlStr);
            }, (err) => {
                return util.writeFile('/index.html', htmlStr);
            })
            .then((success) => {
                console.log('Checkout your index.html :)');
            }, (err) => {
                console.log(err);
            });

    }, (failed) => {
        console.log(failed);
    });
};


module.exports = toHtml;