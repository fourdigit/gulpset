# gulpset

Gulp based project skeleton with modular tasks.

### 1. boilerplate をプロジェクトフォルダに入れる

https://github.com/fourdigitdesign/gulpset
ダウンロードした zip を解凍し、
プロジェクトフォルダにコピペなどします。

### 2. task を有効化する

`gulpset > tasks`の中に、XXX.off というフォルダがあります。
この中で、プロジェクトにおいて gulp の task として使用したいものの「.off」を削除します。

例えば、ejs を書くのであれば、ejs を html にコンパイルする必要があるので
「ejs.off」を「ejs」にします。

以下、主な task です。

| task        | 説明                                                                   |
| ----------- | :--------------------------------------------------------------------- |
| babel       | ES2015 を ES5 の記法に変換してくれる                                   |
| browsersync | ブラウザシンクする                                                     |
| clean       | 主に build フォルダを一旦空にするのに使用                              |
| cleancss    | css を minify してくれる                                               |
| concat      | ファイルを統合してくれる（a.js と b.js をまとめて all.js のように）    |
| copy        | コンパイルを通さないファイルを出力先フォルダにコピーして出力してくれる |
| ejs         | .ejs を.html にコンパイル                                              |
| eslint      | js ファイルのコードチェック                                            |
| sass        | .scss を.css にコンパイル                                              |
| stylelint   | sass ファイルのコードチェック                                          |
| watch       | 指定したファイルの変更監視                                             |

### 4. watch するファイルを設定する

コピペした中で、watch のみ指定ファイルなどが空になっていると思います。
ここに、watch の対象となるファイルのパスと、そのファイルの変更に対して走らせる task を記述します。

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

なお、この時指定するパスは、各 task の src を指定します。
