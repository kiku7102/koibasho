# 恋場所 〜恋の決まり手〜 Prologue v7
## Life Simulation Vertical Slice

「剛ノ山と話すだけ」から、
**見る → 知る → 話す → 影響する → 結果を見る**
へゲームループを拡張したDay1〜3版です。

### 実装済み
- ホーム画面
- 1日2行動
- MAP
- 雷神部屋 / 国技館 / コンビニ / SNS / 記者エリア
- 行動による取りこぼし
- 気づき（Knowledge）獲得
- KnowledgeをAI会話へ送信
- 3日分の取組演出
- AI自由会話
- スマホのトーク
- SNSフィード
- 思い出アルバム
- 恋愛番付
- 好意 / 信頼 / 尊敬 / 警戒 / 自尊心 / 闘志 / 依存 の内部状態
- Day3のクリフハンガー
- 主人公導入オープニング
- 2回目以降のオープニングスキップ
- 透過WebP表情差分を継続使用
- localStorageセーブ
- API失敗時のDEMO AIフォールバック

### 重要
server.js のAIスキーマも更新しています。
GitHubへ全上書きしてPushしてください。
RenderがAuto Deployならserver.jsも自動更新されます。

APIキーは引き続きGitHubには置かず、Render Environment Variablesだけに保存してください。
