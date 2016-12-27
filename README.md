# 简洁的Webpack技术栈脚手架- Lite

本项目由`React`脚手架迁移而来，它保留了`webpack`的基础配置，去除了`React`项目相关的信息，可以称之为`Lite`版本，不添加任何第三方框架，可以基于此去打造自己的项目。

## 功能

- `webpack`支持打包`ES6`，`Less`,默认监听在`3005`端口
- 集合`mock`服务，默认监听在`8005`端口
- `webpack`支持抽离第三方资源库，在`webpack.config.js`配置`externals`字段即可

## 开始使用

### 一、克隆仓库

```bash
git clone https://github.com/luckyjing/lite.git <your_project_name>
cd <your_project_name>
```

### 二、安装依赖

```bash
npm install # 当然，用cnpm更好
```
### 三、启动

```bash
npm run dev
```

默认启动在`3005`端口，与此同时，还在`8005`端口上启动了`mock`服务，方便大家进行开发，有关`mock`的内容，可以查看此[文章](http://www.luckyjing.com/posts/front-end/mock2easy-middleware.html)端口可以在`package.json`里面进行配置。

现在，你可以访问`http://localhost:3005`了

### 四、 打包文件

执行构建命令，`build`文件夹会存放构建好的`css`和`js`文件。

```bash
npm run build
```

恭喜你，你现在可以愉快的开发了~ :thinking:
