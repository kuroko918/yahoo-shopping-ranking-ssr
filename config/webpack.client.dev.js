const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const src  = path.resolve(__dirname, '../src')
const dist = path.resolve(__dirname, '../public')
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "index.html"
});

module.exports = {
  mode: 'development',
  entry: [src + '/index.js', '@babel/polyfill'],
  output: {
    filename: 'client.bundle.js',
    path: dist
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: dist,
    historyApiFallback: true,
    inline: true,
    host: 'localhost',
    port: 8080,
    proxy: {
      '*': {
        target: 'http://localhost:3000',
        secure: false,
        logLevel: 'debug'
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
}
