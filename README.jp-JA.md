# gulpset

Gulp based project skeleton with modular tasks.

### 1. boilerplateをプロジェクトフォルダに入れる
https://github.com/fourdigitdesign/gulpset
ダウンロードしたzipを解凍し、
プロジェクトフォルダにコピペなどします。


### 2. taskを有効化する
`gulpset > tasks`の中に、XXX.offというフォルダがあります。
この中で、プロジェクトにおいてgulpのtaskとして使用したいものの「.off」を削除します。

例えば、ejsを書くのであれば、ejsをhtmlにコンパイルする必要があるので
「ejs.off」を「ejs」にします。

以下、主なtaskです。

| task        | 説明 |
| --------------- |:---------------|
| babel | ES2015をES5の記法に変換してくれる |
| browsersync | ブラウザシンクする |
| clean | 主にbuildフォルダを一旦空にするのに使用 |
| cleancss | cssをminifyしてくれる |
| concat | ファイルを統合してくれる（a.jsとb.jsをまとめてall.jsのように）|
| copy | コンパイルを通さないファイルを出力先フォルダにコピーして出力してくれる |
| ejs | .ejsを.htmlにコンパイル |
| eslint | jsファイルのコードチェック |
| sass | .scssを.cssにコンパイル |
| sasslint | sassファイルのコードチェック |
| stylist | stylusファイルのコードチェック |
| stylus | .stylを.cssにコンパイル |
| watch | 指定したファイルの変更監視 |



### 4. watchするファイルを設定する
コピペした中で、watchのみ指定ファイルなどが空になっていると思います。
ここに、watchの対象となるファイルのパスと、そのファイルの変更に対して走らせるtaskを記述します。
```
gulpset.confs.watch = [{
   watch: gulpset.confs.stylus.src,
   run: ["stylus"]
}, {
   watch: gulpset.confs.eslint.src,
   run: ["eslint"]
}, {
   watch: gulpset.confs.ejs.src,
   run: ["ejs"]
}, {
   watch: gulpset.confs.copy.src,
   run: ["copy"]
}];
```

なお、この時指定するパスは、各taskのsrcを指定します。
