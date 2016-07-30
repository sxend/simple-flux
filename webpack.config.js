'use strict';
let webpack = require('webpack');

module.exports = {
  context: __dirname + "/lib",
  entry: "./index.ts",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['', '.ts', '.html']
  },
  module: {
    loaders: [{
      test: /\.ts$/,
      loader: "ts-loader"
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
