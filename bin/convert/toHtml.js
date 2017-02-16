const juicer = require('juicer');
const path = require('path');

const util = require('../lib/util');

juicer.register('formatDate', util.formatDate);
juicer.register('subDate', util.subDate);

const toHtml = (jsonPath, theme, useString) => {
    var modelPath = path.join(__dirname, '..', 'views', theme, 'model.html'),
        cssPath = path.join(modelPath, '..', 'main.css'),
        jsPath = path.join(modelPath, '..', 'main.js'),
        lessPath = path.join(modelPath, '..', 'main.less');

    function* gen() {
        var data = JSON.parse(yield util.getFile(jsonPath));
            tpl = yield util.getFile(modelPath),
            htmlStr = juicer(tpl, data);

        try {
            var lessStr = yield util.getFile(lessPath);
        } catch(err) {
            var lessStr = new Error("no file");
        }

        try {
            var cssStr = yield util.getFile(cssPath);
        } catch(err) {
            var cssStr = new Error("no file");
        }

        try {
            var jsStr = yield util.getFile(jsPath);
        } catch(err) {
            var jsStr = new Error("no file");
        }

        if (typeof lessStr === "string") htmlStr = util.bundleHtml(htmlStr, 'less', lessStr);
        if (typeof cssStr === "string") htmlStr = util.bundleHtml(htmlStr, 'css', cssStr);
        if (typeof jsStr === "string") htmlStr = util.bundleHtml(htmlStr, 'js', jsStr);
        htmlStr = util.htmlMin(htmlStr);

        if (useString) return htmlStr;

        util.writeFile('/index.html', htmlStr)
            .then((data) => {
                console.log('Checkout your index.html! :)');
            }, (err) => {
                console.log(err);
            });
    }

    // function run(gen) {
    //     var g = gen();

    //     function next(data) {
    //         var result = g.next(data);
    //         if (result.done) return result.value;
    //         result.value.then((data) => {
    //             next(data);       
    //         }, (data) => {
    //             next(data);
    //         });
    //     }

    //     next();
    // }

    return gen;
};


module.exports = toHtml;