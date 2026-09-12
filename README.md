# 恋場所 〜恋の決まり手〜 GitHub Pages / iPhone Safari 検証版

## 公開手順

1. GitHubで新しいリポジトリを作成
2. このフォルダ内のファイルをすべてリポジトリ直下へアップロード
3. GitHubの Settings → Pages
4. Source: Deploy from a branch
5. Branch: main / root
6. Save
7. 発行された `https://ユーザー名.github.io/リポジトリ名/` をiPhoneのSafariで開く

## iPhoneでアプリ風に使う

Safariで開く → 共有 → ホーム画面に追加

PWA設定済みなので、ホーム画面から起動すると単独アプリに近い表示になります。

## ファイル

- index.html : ゲーム本体
- manifest.webmanifest : ホーム画面追加/PWA設定
- sw.js : 簡易オフラインキャッシュ
- .nojekyll : GitHub Pages用


推奨GitHubリポジトリ名: `koibasho`
