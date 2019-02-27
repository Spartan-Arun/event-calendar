const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry:["babel-polyfill","./src/index.js"],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env","@babel/preset-react"],plugins:["@babel/plugin-proposal-class-properties"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
        changeOrigin: true
      }
    },
    historyApiFallback: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};