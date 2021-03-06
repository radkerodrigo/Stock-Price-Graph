const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].[chunkhash].js',
		path: __dirname + '/dist',
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader' }
			},
			{
				test: /\.html$/,
				use: [
					{ loader: 'html-loader' }
				]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			},
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/index.html',
			filename: './index.html'
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.css'],
		alias: {
			Components: path.resolve(__dirname, 'src/js/components/'),
			Containers: path.resolve(__dirname, 'src/js/containers/'),
			Styles: path.resolve(__dirname, 'src/styles/')
		}
	},
	stats: {
		children: false,
		colors: true,
		modules: false
	}
};