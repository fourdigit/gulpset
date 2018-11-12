# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2019-11-12

- Prettier との連携を鑑みて、sass-lint をやめて stylelint に変更
  - https://qiita.com/tkiryu/items/016aa9ef8a25b631e7e6
  - https://devblog.thebase.in/entry/2018/06/06/110000
  - VS Code の Workspace Setting を追加

## [3.0.2] - 2019-10-22

- aigis のバージョンをあげる(ejs の include のネスティングに対応)
- readme に、webpack の mode についての説明を追加
- ejs の defaultparamsMapper 修正

## [3.0.1] - 2018-10-12

### Fixed

- gulp-rsync を devDependencies に

## [3.0.0] - 2018-10-12

### Added

- [x] ベストプラクティスに基づいたディレクトリ構成やファイルを追加
- [x] production ビルドの用意
- [x] greenkeeper 追加
- [x] デプロイタスクを追加
- [x] Bitbucket Pipeline による自動デプロイの仕組みを追加
- [x] https://github.com/fourdigit/scss-utilities 追加

### Modified

- [x] 利用頻度が高いタスクをデフォルトで on に
- [x] config.js を削除して、task のコンフィグを直接変更するように。(package に隠蔽できていない状態で config が 2 箇所にあると、混乱をまねいてしまうケースが非常に多かったため)
- [x] Stylus, Stylint, jsdoc, jsdoc2md, サポートの停止(jsdoc はあっても良いかもしれない)

### Fixed

- [x] EJS、`/src`基準のパスで書けるように修正
- [x] EJS、`.ejs`で動くように修正(`.html`に設定されていたので)
- [x] EJS、\_が頭についているファイルを build に出さないように
- [x] Styleguide で、修正した aigis を使うように修正(`EJS`のルート指定のため)
- [x] Sass、CSS import ができるように `node-sass-package-importer` 追加
- [x] Sass、autoprefixer 指定が壊れている(無意味に 2 回呼び出されている？)ので修正
- [x] Sass、\_が頭についているファイルを build に出さないように
- [x] Sass、postCSS の設定ミス修正(spritesheet でうまくいかない場合があるので無効化)
- [x] Eslint task 追加(jQuery の doller-sign 関係も修正)
- [x] webpack, js 修正時に reload
- [x] webpack, js, jsx 拡張子に対応(非標準の es6 拡張子を避ける)
- [x] webpack, development ビルドと production ビルドを分ける

## [2.0.0] - 2018-07-04

V2. Gulp 4 version.

## [1.0.0] - 2016-10-17

Initial commit
