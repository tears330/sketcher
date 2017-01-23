const juicer = require('juicer');
const path = require('path');

const util = require('../lib/util');

juicer.register('formatDate', util.formatDate);
juicer.register('subDate', util.subDate);

const toHtml = (jsonPath, theme) => {
    var modelPath = path.join(__dirname, '..', 'views', theme, 'model.html'),
        cssPath = path.join(modelPath, '..', 'main.css'),
        jsPath = path.join(modelPath, '..', 'main.js'),
        lessPath = path.join(modelPath, '..', 'main.less');

    Promise.all([util.getFile(jsonPath), util.getFile(modelPath)]).then((success) => {
        var data = JSON.parse(success[0]),
            tpl = success[1],
            htmlStr = juicer(tpl, data);

        util.getFile(lessPath)
            //  判断主题路径下是否存在对应静态资源，存在则进行打包
            .then((data) => {
                htmlStr = util.bundleHtml(htmlStr, 'less', data);
                return util.getFile(cssPath);
            }, (err) => {
                return util.getFile(cssPath);
            })
            .then((data) => {
                htmlStr = util.bundleHtml(htmlStr, 'css', data);
                return util.getFile(jsPath);
            }, (err) => {
                return util.getFile(jsPath);
            })
            .then((data) => {
                htmlStr = util.bundleHtml(htmlStr, 'js', data);
                return util.writeFile('/index.html', util.htmlMin(htmlStr));
            }, (err) => {
                return util.writeFile('/index.html', util.htmlMin(htmlStr));
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