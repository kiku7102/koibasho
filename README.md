# 恋場所 〜恋の決まり手〜 Prologue v3 — Image Sprite Edition

先ほど生成した剛ノ山の正式ビジュアルと表情差分を、そのままゲーム内スプライトとして組み込みました。

## 収録した表情画像

```text
assets/gonoyama/
├─ neutral.png   通常
├─ soft.png      柔らかい微笑
├─ blush.png     照れ
├─ serious.png   真剣
├─ annoyed.png   不機嫌
├─ tired.png     疲労・痛み
└─ sad.png       寂しさ・弱さ
```

AIが返す `emotion` に応じて画像が自動で切り替わります。

- neutral → 通常
- soft → 微笑
- blush → 照れ
- serious → 真剣
- annoyed → 不機嫌
- tired / pain → 疲労
- sad → 寂しさ
- smile → 微笑

表情変更時はフェード演出を行います。
iPhone Safariでも画像サイズが崩れにくいよう `object-fit: contain` で実装しています。

## GitHubへの反映

ZIPを展開して、`koibasho` リポジトリへ全ファイルを上書きしてください。
GitHub Desktopを使う場合は `koibasho` をCurrent repositoryにした上で、
展開した中身をリポジトリのフォルダへコピー → Commit → Push origin です。

特に追加されるのは `assets/gonoyama/` の画像ファイルです。

## Render

`server.js` も更新しています。
AIのemotionに `sad` を追加したため、GitHubへPushするとRenderのAuto Deployが有効なら自動再デプロイされます。

APIキーは引き続きRenderのEnvironment Variablesだけに保存してください。
