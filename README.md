## fmeditor

fmeditorは、フロントマターを編集することができるコマンドラインのツールです。  
マークダウンを標準入力から受け取り、コマンドライン引数に従って、フロントマターを編集します。

## インストール

```bash
$ npm install --global @kokiito0926/fmeditor
```

## 使用方法

curlなどで取得したマークダウンをパイプでfmeditorに流し込みます。  
そうすると、コマンドライン引数の値がセットされたフロントマターとともにマークダウンが出力されます。

```bash
$ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | fmeditor --draft true
```

```bash
$ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | fmeditor --tags '["markdown", "frontmatter", "yaml"]'
```

## ライセンス

[MIT](LICENSE)