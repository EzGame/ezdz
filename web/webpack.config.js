// Equivalent to
// webpack ./entry.js bundle.js  --module-bind 'css=style!css'
var dev = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: __dirname,

  devtool: dev ? 'inline-sourcemap' : null,

  entry: {
    client: "./src/index.js",
  },

  output: {
    path: __dirname + "./../public/",
    filename: "[name].js"
  },

  plugins: dev ? [
    // Render index.html
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),

    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([{
      from: __dirname + './assets', to: './../public/assets/'
    }])
  ] : [
    // Only emit files when there are no errors
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    new webpack.optimize.DedupePlugin(),

    // Minify all javascript, switch loaders to minimizing mode
    // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    new webpack.optimize.UglifyJsPlugin({
      mangle: false, sourcemap: false
    }),

    // Render index.html
    // Reference: https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),

    // Copy assets from the public folder
    // Reference: https://github.com/kevlened/copy-webpack-plugin
    new CopyWebpackPlugin([{
      from: __dirname + './src/assets', to: '/../public/assets'
    }])
  ],

  module: {
    preLoaders: [],
    loaders: [{
      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        "presets": ["es2015"]
      }
    }, {
      // SASS LOADER
      // Reference: https://github.com/jtangelder/sass-loader
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }, {
      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|otf)$/,
      loader: 'file'
    }, {
      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      test: /\.html$/,
      loader: 'raw-loader'
    }]
  }
};
