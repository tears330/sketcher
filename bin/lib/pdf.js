// 使用phantomjs读取HTML生成PDF
// ENV在phantomjs下，非node
var webpage = require('page');
var system = require('system');

var exitHandler = function (error) {
    var message;
    if (typeof error === 'string') message = error;
    if (error) system.stderr.write('pdf: ' + (message || 'Unknown Error ' + error) + '\n')
    phantom.exit(error ? 1 : 0)
}

// 从stdin流读取数据
var res = JSON.parse(system.stdin.readLine());

if (!res.htmlStr) exitHandler('Dont have any html to parse');

// 设置页面大小格式
page = webpage.create();
if (res.options.viewPortSize) page.viewPort = res.options.viewPortSize;
if (res.options.paperSize) page.paperSize = res.options.paperSize;

page.setContent(res.htmlStr);

// 事件处理
page.onLoadFinished = function(status) {
    page.render(res.filename, {
        format: 'pdf'
    });
    system.stdout.write(JSON.parse({
        filename: res.filename
    }));

    exitHandler(null);
};