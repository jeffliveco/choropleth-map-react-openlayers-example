const HtmlWebPackPlugin = require("html-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader", options: {
              sourceMap: true
          }
        }, {
          loader: "sass-loader", options: {
              sourceMap: true
          }
        }]
      },
    ]
  },
  plugins: [htmlWebpackPlugin, new FriendlyErrorsWebpackPlugin()]
};