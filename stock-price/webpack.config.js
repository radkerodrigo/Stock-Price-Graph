const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: '[name].js',
		path: __dirname + '/dist'
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
			{
				test: /\.(png|jpg|gif)$/,
				exclude: /node_modules/,
				use: { loader: 'file-loader' }
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
		extensions: ['.js', '.jsx', '.json', '.css'],
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