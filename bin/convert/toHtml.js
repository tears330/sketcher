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
        var data = JSON.parse(yield util.getFile(jsonPath)),
            tpl = yield util.getFile(modelPath),
            lessStr = yield util.getFile(lessPath),
            cssStr = yield util.getFile(cssPath),
            jsStr = yield util.getFile(jsPath),
            htmlStr = juicer(tpl, data);

        if (typeof lessStr !== "string") htmlStr = util.bundleHtml(htmlStr, 'less', lessStr);
        if (typeof cssStr !== "string") htmlStr = util.bundleHtml(htmlStr, 'css', cssStr);
        if (typeof jsStr !== "string") htmlStr = util.bundleHtml(htmlStr, 'js', jsStr);
        htmlStr = util.htmlMin(htmlStr);

        if (useString) return htmlStr;

        util.writeFile('/index.html', htmlStr)
            .then((data) => {
                console.log('Checkout your index.html! :)');
            }, (err) => {
                console.log(err);
            });
    }

    function run(gen) {
        var g = gen();

        function next(data) {
            var result = g.next(data);
            if (result.done) return 'result.value';
            result.value.then((data) => {
                next(data);
            });
        }

        next();
    }

    return run(gen);

};


module.exports = toHtml;