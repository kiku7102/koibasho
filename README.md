# 恋場所 〜恋の決まり手〜 Prologue v4

剛ノ山の背景なし立ち絵＋各表情差分をゲームに組み込み、
iPhone / GitHub Pages向けに画像容量を圧縮した版です。

## 表情差分
- neutral: 通常
- soft: 柔らかい表情
- blush: 照れ
- serious: 真剣
- annoyed: 不機嫌
- tired: 疲労
- sad: 悲しみ
- pain: 痛み

## 画像最適化
PNGではなく **WebP（透過対応）** を使用しています。
表示用サイズは最大 640x960 に縮小しました。

元画像合計: 約 14.57 MB
WebP合計: 約 0.47 MB
削減率: 約 96.8%

## GitHub反映
このZIPを展開して `koibasho` リポジトリに全上書きし、
GitHub Desktopで Commit → Push origin してください。

特に `assets/gonoyama/*.webp` が新しい正式スプライトです。

RenderのAPIキーはGitHubには置かず、引き続きRender Environment Variablesだけで管理してください。
