// output.pathに絶対パスを指定する必要があるため、pathモジュールを読み込んでおく
const path = require('path');
const webpack = require('webpack');
module.exports = {
	// エントリーポイントの設定
	mode: 'development',
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
	}
};
