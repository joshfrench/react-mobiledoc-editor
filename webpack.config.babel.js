import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

const TARGET = process.env.npm_lifecycle_event; // start (demo server) or build (production bundle)
process.env.BABEL_ENV = TARGET;

let config = {
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
  config = merge(config, {
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
  config = merge(config, {
    devtool: 'inline-source-map',
    output: {
      devtoolModuleFilenameTemplate: '[resourcePath]',
      devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
    }
  });
}


// production build
if (TARGET === 'build') {
  config = merge(config, {
    plugins: [
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': '"production"'
      })
    ]
  });
}

export default config;
