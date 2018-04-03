// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	// エントリーポイントの設定
	mode: 'production',
	plugins: [new UglifyJsPlugin()],
	entry: {
		libs: './src/js/libs.es6',
		app: './src/js/app.es6'
	},
	// 出力の設定
	output: {
		// 出力するファイル名
		filename: '[name].js',
		// 出力先のパス（v2系以降は絶対パスを指定する必要がある）
		path: path.join(__dirname, 'build/assets/app/js')
	},
	module: {
		rules: [
			{
				// 拡張子 .js の場合
				test: /\.js$/,
				use: [
					{
						// Babel を利用する
						loader: 'babel-loader',
						// Babel のオプションを指定する
						options: {
							presets: [
								// env を指定することで、ES2017 を ES5 に変換。
								// {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
								// webpack の Tree Shaking 機能が使えない
								['env', { modules: false }]
							]
						}
					}
				],
				// node_modules は除外する
				exclude: /node_modules/
			}
		]
	}
};
