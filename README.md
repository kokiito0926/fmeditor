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
$ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | fmeditor get --title --tags --draft
```

```bash
$ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | fmeditor set --tags '["markdown", "frontmatter", "yaml"]'
```

```bash
$ curl -fsSL https://raw.githubusercontent.com/Kernix13/markdown-cheatsheet/refs/heads/master/frontmatter.md | fmeditor remove --title --tags
```

## ライセンス

[MIT](LICENSE)