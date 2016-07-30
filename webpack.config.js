'use strict';
let webpack = require('webpack');

module.exports = {
  context: __dirname + "/lib",
  entry: "./index.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.html']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: "babel"
    }, {
      test: /\html$/,
      loader: "html"
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
