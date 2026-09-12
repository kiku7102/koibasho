# 恋場所 〜恋の決まり手〜 Prologue v5 — Opening Edition

## 新規実装
- ゲーム開始前に5カットのオープニングを追加
- 世界観 → 本場所 → 剛ノ山紹介 → タイトル → 最初の台詞 の順に導入
- 初回プレイは最後まで見る仕様
- 2回目以降は「オープニングをスキップ」ボタン表示
- スキップ判定は localStorage の `koibasho_opening_seen_v1` で保持
- 既存のAI LIVE、表情差分、軽量WebPスプライトは維持

## GitHub反映
ZIPを展開して `koibasho` リポジトリへ全上書きし、
GitHub Desktopで Commit → Push origin してください。

Renderの設定変更は不要です。
