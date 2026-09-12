import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") || "*" }));
app.use(express.json({ limit: "64kb" }));

const port = process.env.PORT || 10000;
const model = process.env.OPENAI_MODEL || "";
const client = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const characterBible = `
あなたは恋愛ADV「恋場所 〜恋の決まり手〜」の登場人物、剛ノ山 剛志を演じる。
27歳、188cm、168kg、十両上位。無口、真面目、頑固、負けず嫌い。不器用だが細かい気遣いをする。
同情されるのが苦手。簡単に惚れない。プレイヤーに迎合しすぎない。たまに誤解する。
甘い物、特にプリンが好き。猫に弱い。照れると目をそらす。
根本的な恐怖は「相撲ができなくなったら自分には何も残らない」。
発話は原則1〜3文。長広舌にしない。「……」を自然に使う。説明口調を避ける。
プレイヤーの過去の言葉を重要な時に思い出してよいが、毎回引用しない。
「好感度+5」などゲーム内部数値を口にしない。
`;

function sceneRules(day, turn) {
  if (day === 1) return `
Day1 初対面。雷神部屋の玄関。まだ信頼していない。
恋愛感情を急激に示さない。怖そうだが、完全に冷たくはない。
帰り際までに「明日も来るんだろ？」につながる程度の興味を持つ。`;
  if (day === 2) return `
Day2。二連勝後。左足に軽い痛みがあるが、本人は怪我だと認めたくない。
自分から「怪我している」と断定しない。心配されると少し嬉しいが、表では否定しやすい。
後半はプリンを2個持っている日常ギャップを出せる。`;
  return `
Day3。初黒星の夜。自尊心が少し下がっている。普段より会話を切り上げない。
勝敗と自分の価値を結びつけている。「勝てない力士に価値があるか」が内面テーマ。
プレイヤーの価値観に関する言葉は強く記憶してよい。`;
}

const responseSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    dialogue: { type: "string" },
    emotion: { type: "string", enum: ["neutral","soft","blush","annoyed","tired","pain","serious","smile","sad"] },
    gesture: { type: "string", enum: ["still","look_away","rub_neck","step_closer","small_smile","flinch"] },
    affection_delta: { type: "integer", minimum: -8, maximum: 8 },
    trust_delta: { type: "integer", minimum: -8, maximum: 8 },
    respect_delta: { type: "integer", minimum: -8, maximum: 8 },
    guard_delta: { type: "integer", minimum: -8, maximum: 8 },
    selfEsteem_delta: { type: "integer", minimum: -8, maximum: 8 },
    fightingSpirit_delta: { type: "integer", minimum: -8, maximum: 8 },
    injury_delta: { type: "integer", minimum: -3, maximum: 3 },
    fatigue_delta: { type: "integer", minimum: -3, maximum: 3 },
    dependency_delta: { type: "integer", minimum: -8, maximum: 8 },
    action_intent: { type: "string" },
    topic: { type: "string" },
    memory_importance: { type: "integer", minimum: 0, maximum: 5 },
    memory_summary: { type: "string" },
    should_end_scene: { type: "boolean" }
  },
  required: ["dialogue","emotion","gesture","affection_delta","trust_delta","respect_delta","guard_delta","selfEsteem_delta","fightingSpirit_delta","injury_delta","fatigue_delta","dependency_delta","action_intent","topic","memory_importance","memory_summary","should_end_scene"]
};

app.get("/health", (req,res) => res.json({ ok:true, ai: Boolean(client && model), model: model || null }));

app.post("/api/dialogue", async (req,res) => {
  if (!client || !model) return res.status(503).json({ error:"OPENAI_API_KEY and OPENAI_MODEL are required" });

  const { day, turn, player_text, state, memories, recent_history, knowledge, location, channel, scene } = req.body || {};
  if (!player_text || typeof player_text !== "string") return res.status(400).json({ error:"player_text is required" });

  const context = {
    day, turn, scene, location, channel, state,
    knowledge: Array.isArray(knowledge) ? knowledge.slice(-12) : [],
    memories: Array.isArray(memories) ? memories.slice(-8) : [],
    recent_history: Array.isArray(recent_history) ? recent_history.slice(-8) : []
  };

  const input = [
    { role:"developer", content:[
      { type:"input_text", text: characterBible + "\n" + sceneRules(day,turn) + `
必ずゲーム用JSONとして返す。
emotion/gestureは返答に合うものを選ぶ。
数値変化は小さくする。一発言だけで恋愛関係を大幅に変えない。
memory_importance 3以上は、後で思い出す価値のある言葉だけ。
memory_summary は剛ノ山視点で短く要約する。重要でなければ空文字。
knowledge は「プレイヤーが実際に見聞きした情報」。プレイヤーがその情報を前提に話した場合だけ、剛ノ山は「見ていたのか」など自然に反応してよい。
プレイヤーが知らない情報を、剛ノ山側から都合よく説明しすぎない。
channel が phone の場合は短いメッセージ口調にする。
dependency_delta は、剛ノ山がプレイヤーへ判断を委ねる傾向の変化。過度な依存を安易に上げない。
action_intent は今後の行動意図を短い英字または日本語で返す。topic は会話テーマを短く返す。` }
    ]},
    { role:"user", content:[
      { type:"input_text", text:`現在のゲーム状態:\n${JSON.stringify(context)}\n\nプレイヤーの発言:\n${player_text}` }
    ]}
  ];

  try {
    const response = await client.responses.create({
      model,
      input,
      text: {
        format: {
          type: "json_schema",
          name: "koibasho_dialogue",
          strict: true,
          schema: responseSchema
        }
      }
    });
    const out = JSON.parse(response.output_text);
    res.json(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error:"AI response failed" });
  }
});

app.listen(port, () => console.log(`KOIBASHO API listening on :${port}`));
