![](https://img.alicdn.com/tfs/TB1bEQzPVXXXXXqapXXXXXXXXXX-1358-960.png)

# 简洁的Webpack技术栈脚手架- Lite

> 背景：大家或许都有过这种经历，学习一些新知识，做一些测试，都需要开启一个`demo`工程，但是如果管理不够好，量大的话，几个月过后，平常的代码文件夹也凌乱不堪了。本项目便提供了一个开发环境，你可以将你的`demo`写到每个独立的`js`文件夹，然后便可以通过访问`url`来访问每个独立的项目了。

本项目提供了一份基础但是实用的`webpack`脚手架，基于`webpack2.x`，你可以基于此方便地开始你的新项目。

## 功能

- `webpack`支持打包`ES6`,`Less`,`Sass`，开发服务器默认监听在`3005`端口
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

### 四、 项目静态化

执行构建命令，`build`文件夹会**按照项目名独立存放**构建好的`html`,`css`和`js`文件，你可以将其放到任何一个静态资源服务器上，比如[anywhere](https://github.com/JacksonTian/anywhere)

```bash
npm run build

# build
.
├── demo
│   ├── index.css
│   ├── index.html
│   └── index.js
├── index
│   ├── index.css
│   ├── index.html
│   └── index.js
├── index.html
└── vendor.js
```

恭喜你，你现在可以愉快的开发了~ :thinking:

### 五、添加一个新项目

在`scr/scripts`下新建一个`javascript`文件
```sh
touch src/scripts/demo.js
```

创建其相关的`html`文件，`css`文件，这里并不限定其所在目录
```sh
touch src/css/demo.scss
touch src/html/demo.html
```

在`demo.js`文件里引入资源
```sh
import html from '../html/demo.html';
import '../css/demo.scss';
$('#root').append(html);
```

你也可以使用目录下的`create.sh`和`del.sh`
```sh
chmod +x create.sh del.sh
./create.sh <projectName>
./del.sh <projectName>
```