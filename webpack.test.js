module.exports = {
  entry: "mocha!./test/index.js",
  output: {
    path: __dirname + '/test',
    filename: "test.bundle.js"
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        // exclude: path.resolve(__dirname, 'node_modules')
        exclude: /node_modules\//
      }
    ]
  },
  externals: {
    'describe': 'window',
    'it': 'window',
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
