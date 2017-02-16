var system = require('system')
var webpage = require('webpage')

function exitHandler (error) {
  var message
  if (typeof error === 'string') message = error
  if (error) system.stderr.write('pdf: ' + (message || 'Unknown Error ' + error) + '\n')
  phantom.exit(error ? 1 : 0)
}

// Build stack to print
function buildStack (msg, trace) {
  var msgStack = [msg]
  if (trace && trace.length) {
    msgStack.push('Stack:')
    trace.forEach(function (t) {
      msgStack.push('  at ' + t.file || t.sourceURL + ': ' + t.line + ' (in function ' + t.function + ')')
    })
  }
  return msgStack.join('\n')
}

phantom.onError = function (msg, trace) {
  exit(buildStack('Script - ' + msg, trace))
}

// 从stdin流读取数据
var res = JSON.parse(system.stdin.readLine());

if (!res.htmlStr) exitHandler('Dont have any html to parse');

// 设置页面大小格式
page = webpage.create();

if (res.options.viewPortSize) page.viewPort = res.options.viewPortSize;
if (res.options.paperSize) page.paperSize = res.options.paperSize;


page.setContent(res.htmlStr, null);

// 事件处理
page.onLoadFinished = function(status) {
    page.render(res.options.fileName, {
        format: 'pdf'
    });
    system.stdout.write("Checkout your index.pdf! :)");

    exitHandler(null);
};
