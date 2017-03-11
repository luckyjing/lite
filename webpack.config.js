var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var devServerPort = require('./package.json').port.webpack;

// 删除build目录
var del = require('del');
del(['./build/*']);

// webpack插件列表
var HtmlwebpackPlugin = require('html-webpack-plugin'); // 生成一个html 加载 打包好后的脚本
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;


// 资源路径列表
var entryPath = process.cwd();
var sourceEntry = path.resolve(entryPath, 'src/scripts/index.js'); // 项目入口文件
var buildDir = path.resolve(entryPath, 'build');// 打包目标地址
var debug = process.env.NODE_ENV !== 'production';

// 开发配置
var devBuildDir = path.resolve(entryPath, '__build'); // 开发环境下 静态资源目录
// 第三方资源
// example
/**
 * var externals = {
 *   "react": 'React',
     "react-dom": "ReactDOM"
 * }
 */
// Don't follow/bundle these modules, but request them at runtime from the environment
var externals = {
};
var config = {
  entry: [
    sourceEntry
  ],
  output: {
    path: debug ? devBuildDir : buildDir,
    filename: debug ? 'index.js' : 'scripts/index.js',
    publicPath: debug ? '/' : './' // 各种资源生成的链接[如 打包的图片]
  },
  externals: debug ? {} : externals,
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
  plugins: [],
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
      'scss-loader'
    ]
  };
  config.module.rules.push(cssLoader);
  config.module.rules.push(lessLoader);
  config.module.rules.push(sassLoader);
  config.plugins = config.plugins.concat([
    // 生成HTML
    new HtmlwebpackPlugin({
      template: path.resolve(entryPath, 'src/index.html'),
      filename: 'index.html',
      inject: 'body'
    }),
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
  config.module.rules.push(cssLoader);
  config.module.rules.push(lessLoader);
  // 分离出的css代码 在这里被注入到 css/[name].css文件里
  // @see https://github.com/webpack/extract-text-webpack-plugin
  config.plugins.push(new ExtractTextPlugin({
    filename: 'css/index.css',
    allChunks: false
  }));
  // 压缩
  config.plugins.push(new UglifyJsPlugin({
    minimize: true
  }));
}

module.exports = config;
