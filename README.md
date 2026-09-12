# 恋場所 〜恋の決まり手〜 Prologue 完全版

このZIPには、GitHub Pages用フロントエンドとRender用AIバックエンドをすべて含めています。

## GitHub `koibasho` リポジトリ直下に入れるファイル

以下を**すべてリポジトリ直下**にアップロードしてください。

```text
koibasho/
├─ index.html
├─ config.js
├─ server.js
├─ package.json
├─ render.yaml
├─ .env.example
├─ README.md
└─ public/
   ├─ index.html
   └─ config.js
```

RenderをGitHubの同じ `koibasho` リポジトリからデプロイしているため、
`server.js` と `package.json` がリポジトリ直下に必要です。

## GitHub Pages

GitHub Pagesはリポジトリ直下の

- `index.html`
- `config.js`

を使用します。

`config.js` はすでに以下へ接続する設定です。

```js
window.KOIBASHO_API_BASE = "https://koibasho-api.onrender.com";
```

## Render

Render側では次の環境変数を設定してください。

```text
OPENAI_API_KEY
OPENAI_MODEL
CORS_ORIGIN
```

例:

```text
CORS_ORIGIN=https://kiku7102.github.io
```

`OPENAI_API_KEY` はGitHubに絶対に置かないでください。

## Render 設定

```text
Language: Node
Build Command: npm install
Start Command: npm start
Root Directory: 空欄
```

## 接続確認

Render:

```text
https://koibasho-api.onrender.com/health
```

GitHub Pages上のゲームで、会話送信後に右上表示が

```text
DEMO AI
```

から

```text
AI LIVE
```

へ変われば接続成功です。

## 注意

`.env.example` は説明用です。
本物のAPIキーは記入せず、RenderのEnvironment Variablesで設定してください。
