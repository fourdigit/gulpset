# gulpset

Gulp based project skeleton with modular tasks.

いったんmodularをやめてwebpackに中央集権 && 引数で環境を切り替えられるようにします。

- `gulpset init`

| key | value |
| :-- | :-- |
| js | `esNext`(default), `es5`, `ts` |
| css | `scss`(default), `stylus` |
| html | `ejs`(default), `html`, `pug` |

linterは、利用する環境に応じたものが自動追加


## V3.0

- ESLintとPrettierをデフォルトに
- TypeScriptを
