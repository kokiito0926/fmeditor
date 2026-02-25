## fmeditor

fmeditorは、フロントマターを編集することができるコマンドラインのツールです。  
標準入力からマークダウンを受け取り、フロントマターのフィールドをコマンドライン引数から編集することができます。

## インストール

```bash
$ npm install --global @kokiito0926/fmeditor
```

## 使用方法

curlなどで取得したマークダウンをパイプでfmeditorに流し込みます。

```bash
$ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | fmeditor --draft true
```

```bash
$ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | fmeditor --tags '["markdown", "frontmatter", "yaml"]'
```

## ライセンス

[MIT](LICENSE)