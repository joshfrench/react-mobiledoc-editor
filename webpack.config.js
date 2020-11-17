const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event; // start (demo server) or build (production bundle)
process.env.BABEL_ENV = TARGET;

const baseConfig = {
  output: {
    library: 'ReactMobiledocEditor',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: `typeof self !== 'undefined' ? self : this`
  },
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
  module.exports = {
    ...baseConfig,
    entry: './demo/index.js',
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './demo',
      stats: 'errors-only'
    }
  }
}

// production build
if (TARGET === 'build') {
  module.exports = {
    ...baseConfig,
    externals: {
      "react": "umd react",
      "react-dom": "umd react-dom",
      "prop-types": "umd prop-types",
      "mobiledoc-kit": "umd mobiledoc-kit"
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
      })
    ]
  }
}
