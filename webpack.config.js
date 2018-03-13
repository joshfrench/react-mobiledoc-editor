var webpack = require('webpack');
var merge = require('webpack-merge');

var TARGET = process.env.npm_lifecycle_event; // start (demo server) or build (production bundle)
process.env.BABEL_ENV = TARGET;

var config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  }
};

// dev server
if (TARGET === 'start' || !TARGET) {
  module.exports = merge(config, {
    entry: './demo/index.js',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './demo',
      stats: 'errors-only'
    }
  });
}

// production build
if (TARGET === 'build') {
  module.exports = merge(config, {
    externals: {
      "react": "umd react",
      "react-dom": "umd react-dom",
      "create-react-class": "umd create-react-class",
      "prop-types": "umd prop-types",
      "mobiledoc-kit": "umd mobiledoc-kit"
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      })
    ]
  });
}
