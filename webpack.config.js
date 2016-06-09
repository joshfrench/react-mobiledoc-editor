var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event; // start (demo server) or build (production bundle)
process.env.BABEL_ENV = TARGET;

var config = {
  entry: ['./src/index.js']
};

config.output = {
  path: path.join(__dirname, 'dist'),
  filename: 'index.js'
};

config.module = {
  loaders: [
    {
      test: /\.js$/,
      loaders: ['babel'],
      exclude: /node_modules/
    }
  ]
};


// dev server
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(config, {
    devtool: 'inline-source-map',
    entry: ['./demo/index.js'],
    output: {
      devtoolModuleFilenameTemplate: '[resourcePath]',
      devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
    },
    devServer: {
      contentBase: './demo',
      hot: true,
      inline: true,
      progress: true,
      stats: 'error-only'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}


// karma and friends
if (/^test/.test(TARGET)) {
  module.exports = merge(config, {
    devtool: 'inline-source-map',
    output: {
      devtoolModuleFilenameTemplate: '[resourcePath]',
      devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
    },
    // enzyme compat
    externals: {
      'cheerio': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  });
}


// production build
if (TARGET === 'build') {
  module.exports = merge(config, {
    plugins: [
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
      })
    ]
  });
}
