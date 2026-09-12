# 恋場所 〜恋の決まり手〜 Prologue v8
## Action & Intervention System

v7の「MAP＋自由AI会話」に、会話以外のゲームプレイを本格追加した版です。

### 新規実装
- 観察ターン：「何を見るか」を1つ選択
- 介入ターン：「どう行動するか」を選択
- 観察内容による行動ロック
- Narrative Flags
- Action Memory（何をしたかの記憶）
- 秘密の共有範囲
- アイテム
- 広報仕事ターン
- 取組前介入
- 親方信頼 / 新田記者信頼
- fanSupport / mediaPressure / rumorLevel
- Day2 怪我ルートの複数分岐
- Day3 「追う / 親方 / 記者対応 / 待つ」の中分岐
- 待つルート専用思い出
- 猫写真ルート
- 過去の行動をAI会話へ送信

### ゲームループ
どこへ行く
→ 何を見る
→ どう動く
→ 広報仕事
→ 取組前行動
→ 試合
→ 自由AI会話
→ スマホ

### GitHub反映
ZIPを展開して `koibasho` リポジトリへ全上書きし、
GitHub Desktopで Commit → Push origin してください。

### Render
server.js も更新しています。
Auto Deployが有効ならPush後に自動反映されます。
APIキーは引き続きRender Environment Variablesだけに保存してください。
