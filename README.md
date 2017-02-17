# Sketcher

Sketcher是一个方便的命令行工具去快速构建你的个人简历.

- 根据JSON信息生成响应式的单文件HTML。不同的设备，一致的浏览体验.

- 支持生成PDF文档，并针对A4纸张做出专门的优化，便于打印与浏览。

- 支持选择主题，审美一向是一件不容易的事情。

## 使用与安装

Sketcher托管在NPM上，你可以方便的使用npm来快速安装:)

`npm install -g sketcher`

### 用例：

#### 生成简历JSON模板

通过`sketch init`命令即可在当前目录下生成`resume.json`，使用你喜欢的编辑器填写修改内容即可:)

#### 生成HTML文件

执行命令`sketch -c JSONPath -t themeName`。

> 参数**c**:`resume.json`的路径

> 参数**t**:可选参数，主题的名称。默认值为`basic`

eg: `sketch -c resume.json -t basic`

#### 生成PDF文件

执行命令`sketch -p JSONPath -t themeName`。

> 参数**p**:`resume.json`的路径

> 参数**t**:可选参数，主题的名称。默认值为`basic`

eg: `sketch -p resume.json -t basic`

## 主题

好吧，当前你只有一款主题可以选择-。-后续作者看天气更新

1. basic -- [查看示例](http://zzfe.top/resume/)