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
    path: __dirname + "/../public/",
    filename: "[name].min.js"
  },

  plugins: dev ? [] : [
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
      from: __dirname + './src/assets'
    }])
  ],

  module: {
    preLoaders: [],
    loaders: [{

      // JS LOADER
      // Reference: https://github.com/babel/babel-loader
      // Transpile .js files using babel-loader
      // Compiles ES6 and ES7 into ES5 code
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        "presets": ["es2015"]
      }
    }, {

      // CSS LOADER
      // Reference: https://github.com/webpack/css-loader
      // Allow loading css through js
      //
      // Reference: https://github.com/postcss/postcss-loader
      // Postprocess your css with PostCSS plugins
      test: /\.css$/,
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      // Extract css files in production builds
      //
      // Reference: https://github.com/webpack/style-loader
      // Use style-loader in development.
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
    }, {

      // ASSET LOADER
      // Reference: https://github.com/webpack/file-loader
      // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
      // Rename the file using the asset hash
      // Pass along the updated reference to your code
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
      loader: 'file'
    }, {

      // HTML LOADER
      // Reference: https://github.com/webpack/raw-loader
      // Allow loading html through js
      test: /\.html$/,
      loader: 'raw'
    }]
  }
};
