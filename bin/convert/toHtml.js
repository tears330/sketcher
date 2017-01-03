const jucier = require('juicer');
const path = require('path');

const util = require('../lib/util');

const toHtml = (jsonPath, theme) => {
    modelPath = path.join(__dirname, '..', 'views', theme, `model.html`);
    Promise.all([util.getFile(jsonPath), util.getFile(modelPath)]).then((success) => {
        var data = JSON.parse(success[0]),
            tpl = success[1],
            htmlStr = jucier(tpl, data);
        util.writeFile('/index.html', htmlStr).then((data) => {
            console.log('success');
        }, (err) => {
            console.log(err);
        });
    }, (failed) => {
        console.log(failed);
    });
};


module.exports = toHtml;