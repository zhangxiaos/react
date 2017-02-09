const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: '/',
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [{
			test: /\.scss$/,
			use: [{
				loader: "style-loader" // creates style nodes from JS strings
			}, {
				loader: "css-loader" // translates CSS into CommonJS
			}, {
				loader: "sass-loader" // compiles Sass to CSS
			}]
		}, {
			test: /\.js[x]?$/,
			use: [{
				loader: "babel-loader",
			}]

		}]
	},
	devServer: {
		historyApiFallback: true,
		inline: true,
		port: 9090,
		stats: {
			colors: true
		}
	}
};