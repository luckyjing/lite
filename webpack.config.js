const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const devServerPort = require('./package.json').port.webpack;
const del = require('del');
const glob = require('glob');

// 当前环境
const debug = process.env.NODE_ENV !== 'production';

// 删除build目录
del(['./build/*']);


// 获得项目入口文件
function getEntry(debug) {
  let files = glob.sync('./src/scripts/*.js');
  let fileEnteries = {};
  files.forEach(file => {
    let entry = path.basename(file, '.js');
    fileEnteries[entry] = [file];
    if (debug) {
      fileEnteries[entry].unshift("webpack/hot/dev-server", "webpack-hot-middleware/client?reload=true");
    }
  });
  return fileEnteries;
}
function getEntryArray() {
  let files = glob.sync('./src/scripts/*.js').map(file => path.basename(file, '.js'));
  return files;
}
// webpack插件列表
const HtmlwebpackPlugin = require('html-webpack-plugin'); // 生成一个html 加载 打包好后的脚本
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


// 资源路径列表
const entryPath = process.cwd();
const sourceEntry = path.resolve(entryPath, 'src/scripts/index.js'); // 项目入口文件
const buildDir = path.resolve(entryPath, 'build');// 打包目标地址

// 开发配置
const devBuildDir = path.resolve(entryPath, '__build'); // 开发环境下 静态资源目录
const entries = Object.assign({}, getEntry(debug), {
  vendor: ['jquery']
});
let chunks = Object.keys(entries);
let config = {
  entry: entries,
  output: {
    path: debug ? devBuildDir : buildDir,
    filename: '[name]/index.js',
    publicPath: '/'
  },
  // Don't follow/bundle these modules, but request them at runtime from the environment
  externals: {},
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-stage-0')
            ],
            plugins: [
              require.resolve('babel-plugin-add-module-exports'),
              require.resolve('babel-plugin-typecheck'),
              require.resolve('babel-plugin-transform-decorators-legacy')
            ]
          }
        }]
      }, {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }, {
        test: /\.ejs$/,
        use: [{
          loader: 'ejs-loader'
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    hot: true,
    inline: true,
    progress: true,
    color: true,
    noInfo: true,
    contentBase: devBuildDir,
    port: devServerPort
  },
  plugins: [new HtmlwebpackPlugin({
    template: path.resolve(entryPath, 'src/catalog.ejs'),
    filename: `index.html`,
    projects: getEntryArray()
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor', // Specify the common bundle's name.
    filename: '[name].js',
    // 提取使用3次以上的模块，将其打包到vendor里
    minChunks: 3
  })
  ],
  devtool: debug ? 'source-map' : false
};


if (debug) {
  // 开发环境
  var cssLoader = {
    test: /\.css$/,
    use: [
      'style-loader', 'css-loader'
    ]
  };
  var lessLoader = {
    test: /\.less$/,
    use: [
      'style-loader',
      'css-loader',
      'less-loader'
    ]
  };
  var sassLoader = {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  };
  config.module.rules.push(cssLoader);
  config.module.rules.push(lessLoader);
  config.module.rules.push(sassLoader);
  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ]);
} else {
  // 发布环境
  var cssLoader = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader']
    })
  };
  var lessLoader = {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'less-loader']
    })
  };
  var sassLoader = {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader']
    })
  };
  config.module.rules.push(cssLoader);
  config.module.rules.push(lessLoader);
  config.module.rules.push(sassLoader);
  // 分离出的css代码 在这里被注入到 css/[name].css文件里
  // @see https://github.com/webpack/extract-text-webpack-plugin
  config.plugins.push(new ExtractTextPlugin({
    filename: '[name]/index.css',
    allChunks: false
  }));
  // 压缩
  config.plugins.push(new UglifyJsPlugin({
    minimize: true
  }));
}
// 为每一个入口文件生成HTML
chunks.forEach(entry => {
  if (entry == 'vendor') {
    return;
  }
  let cfg = {
    title: entry,
    template: path.resolve(entryPath, 'src/template.ejs'),
    filename: `${entry}/index.html`,
    inject: 'body',
    hash: false,
    chunks: ['vendor', entry]
  }
  config.plugins.push(new HtmlwebpackPlugin(cfg));
});
module.exports = config;
