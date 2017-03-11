# 简洁的Webpack技术栈脚手架- Lite

本项目提供了一份基础但是实用的`webpack`脚手架，基于`webpack2.x`，你可以基于此方便地开始你的新项目。

## 功能

- `webpack`支持打包`ES6`，`Less`,`Sass`，开发服务器默认监听在`3005`端口
- 集合`mock`服务，默认监听在`8005`端口
- 支持多入口文件

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
