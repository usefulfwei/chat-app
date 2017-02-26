import path from 'path';
import webpack from 'webpack';

export default {
  context: path.resolve(__dirname, 'src'),
  entry: './client/index.jsx',

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: "/public/assets/",
    filename: path.join('public', 'assets', 'js', 'bundle.js')
  },

  devtool: 'source-map',

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    }]
  }
};
