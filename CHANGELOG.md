# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.2] - 2019-10-22

- aigisのバージョンをあげる(ejsのincludeのネスティングに対応)
- readmeに、webpackのmodeについての説明を追加

## [3.0.1] - 2018-10-12

### Fixed

- gulp-rsyncをdevDependenciesに

## [3.0.0] - 2018-10-12

### Added

- [x] ベストプラクティスに基づいたディレクトリ構成やファイルを追加
- [x] productionビルドの用意
- [x] greenkeeper追加
- [x] デプロイタスクを追加
- [x] Bitbucket Pipelineによる自動デプロイの仕組みを追加
- [x] https://github.com/fourdigit/scss-utilities 追加

### Modified

- [x] 利用頻度が高いタスクをデフォルトでonに
- [x] config.jsを削除して、taskのコンフィグを直接変更するように。(packageに隠蔽できていない状態でconfigが2箇所にあると、混乱をまねいてしまうケースが非常に多かったため)
- [x] Stylus, Stylint, jsdoc, jsdoc2md, サポートの停止(jsdocはあっても良いかもしれない)

### Fixed

- [x] EJS、`/src`基準のパスで書けるように修正
- [x] EJS、`.ejs`で動くように修正(`.html`に設定されていたので)
- [x] EJS、_が頭についているファイルをbuildに出さないように
- [x] Styleguideで、修正したaigisを使うように修正(`EJS`のルート指定のため)
- [x] Sass、CSS importができるように `node-sass-package-importer` 追加
- [x] Sass、autoprefixer指定が壊れている(無意味に2回呼び出されている？)ので修正
- [x] Sass、_が頭についているファイルをbuildに出さないように
- [x] Sass、postCSSの設定ミス修正(spritesheetでうまくいかない場合があるので無効化)
- [x] Eslint task追加(jQueryのdoller-sign関係も修正)
- [x] webpack, js修正時にreload
- [x] webpack, js, jsx拡張子に対応(非標準のes6拡張子を避ける)
- [x] webpack, developmentビルドとproductionビルドを分ける

## [2.0.0] - 2018-07-04

V2. Gulp 4 version.


## [1.0.0] - 2016-10-17

Initial commit
