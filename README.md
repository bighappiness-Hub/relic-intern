# 四国めぐり帖（四国観光案内Webサイト）

四国4県に点在する観光スポットを、知名度に左右されず同じ目線で紹介し、
有名スポットと周辺スポットを組み合わせた周遊ルートで観光客の分散を促すWebサイトです。

> 現在は **UIのみ（モックデータ）**。Supabase との接続を前提にデータ層を分離しています。

## 起動

```bash
npm install
npm run dev
```

## 技術スタック

| 分類 | 採用技術 | 理由 |
| --- | --- | --- |
| ビルド | **Vite 5** + **TypeScript** | Bolt.new の標準テンプレートと同構成。高速なHMR |
| UI | **React 18** | コンポーネント単位で再利用 |
| ルーティング | **React Router v6** | SPA の画面遷移・検索条件を URL クエリで保持 |
| スタイル | **Tailwind CSS v3** + `tailwindcss-animate` | shadcn/ui が前提とする構成。v3 は Bolt での実績が多く安定 |
| UIコンポーネント | **shadcn/ui**（Button / Card / Badge / Input / Sheet / Skeleton） | `components.json` 設定済み。`npx shadcn@latest add xxx` で追加可能 |
| アイコン | **lucide-react** | shadcn/ui 標準 |
| 地図 | **Leaflet** + **react-leaflet v4** | APIキー不要・無料で Bolt でもそのまま動く |
| 地図タイル | **地理院タイル（淡色地図）** | 日本語の地名表示・無料（出典表記のみ） |
| 県境データ | 地球地図日本（[dataofjapan/land](https://github.com/dataofjapan/land) から四国4県を抽出・簡略化） | 県のクリック判定・ハイライト |
| 道のり計算 | OSRM デモサーバー | 2スポット間の車での距離・所要時間と経路線（プロトタイプ用） |
| 経路検索 | Google マップ（URL連携） | 現在地／他スポット／駅名から、車・公共交通・徒歩で検索 |
| スポット写真 | Wikimedia Commons（CC ライセンス） | 撮影者・ライセンス・出典を画面に表示 |
| バックエンド（予定） | **Supabase**（`@supabase/supabase-js` 導入済み） | DB・認証・Storage（スポット画像） |
| フォント | Noto Sans JP（本文）/ Shippori Mincho（見出し） | 和の落ち着いた雰囲気 |

### デザインコンセプト
- 生成り（和紙）の背景に、**藍**（メイン）と**朱**（アクセント）
- 県ごとのテーマカラー：徳島＝阿波藍 / 香川＝オリーブ / 愛媛＝柑橘 / 高知＝黒潮
- 青海波の文様をパターンとして使用
- **カードはすべて同じサイズ・同じ装飾**（有名スポットだけを目立たせない）

## サイトマップ

```
/                         地図（トップ・画面いっぱいの地図）
│  ?pref=kagawa             県を選択：その県にズームしてスポットをポイント表示
│  ?spot=chichibugahama     スポットを選択：写真・概要／行き方／距離のパネル
│  ?spot=…&to=…             2スポット間の距離（直線・車での道のり）と経路線
├─ /spots                 スポット一覧（エリア・カテゴリ・キーワード・「ゆったり」で絞り込み）
│   └─ /spots/:id         スポット詳細（「地図で行き方・距離を調べる」から地図へ）
├─ /routes                周遊ルート一覧（エリア・日程で絞り込み）
│   └─ /routes/:id        ルート詳細（行程タイムライン）
├─ /areas/:prefectureId   → /?pref=… へリダイレクト（旧URL互換）
├─ /about                 このサイトについて
└─ *                      404
```

## 地図の使い方
1. 地図または上部のボタンで県を選ぶ → その県にズームし、スポットがポイント表示される
2. ポイント（または左の一覧）をクリック → 代表写真と概要を表示
3. 「行き方」タブ：出発地（現在地／ほかのスポット／駅名・住所）と移動手段を選び、Googleマップで経路検索
   - 観光スポットには「近くで休憩・食事」として近くの道の駅・グルメを、道の駅・グルメには近くの観光スポットを提案
4. 「距離」タブ：比べるスポットを一覧・近くのスポット・地図上のポイントから選ぶと、直線距離と車での道のり・所要時間を表示し、地図に経路を描画

地図上部の「観光／道の駅／グルメ」で表示する種類を切り替えられます（道の駅は「道」、グルメは「食」の四角いピン）。

選択状態はURLに保存されるため、リンク共有やブラウザの「戻る」に対応しています。PCは左パネル、スマホは下からのシートで表示します。

## 課題解決を仕組みにしている点
- **ランキングなし・ランダム表示**：一覧はセッションごとにシャッフル（`sessionShuffle`）
- **起点スポット＋周辺スポットのルート**：`route_stops.role = 'hub' | 'nearby'`
- **混雑しやすさ＋ずらし方のヒント**：人気の指標ではなく、時間や場所をずらす判断材料として表示
- **「ゆったり巡れる場所だけ」フィルター**：混みやすいスポットを除外
- **近くのスポット**：詳細ページで距離の近い場所を提案

## ディレクトリ構成

```
src/
├─ components/
│  ├─ map/           ShikokuMap（Leaflet）, SpotPanel（概要/行き方/距離）, BrowsePanels
│  ├─ ui/            shadcn/ui コンポーネント
│  ├─ layout/        Header / Footer / Layout
│  └─ SpotCard, RouteCard, SpotImage, PhotoCredit, Tags, SectionHeading
├─ pages/            各画面
├─ data/             モックデータ（master / spots / spots-michinoeki-gourmet / spot-photos / routes / shikoku.geo.json）
├─ lib/
│  ├─ api.ts         ★ データ取得関数（Supabase 接続時はここだけ差し替え）
│  ├─ geo.ts         距離計算・道のり取得（OSRM）・Googleマップ経路URL
│  ├─ supabase.ts    Supabase クライアント（環境変数があれば有効）
│  └─ utils.ts
├─ hooks/use-async.ts
└─ types/index.ts    ドメイン型（DB スキーマと対応）
supabase/schema.sql  テーブル定義・RLS・近隣検索 RPC
```

## Supabase 接続の手順（予定）
1. Supabase プロジェクトを作成し、`supabase/schema.sql` を SQL Editor で実行
2. `src/data/*.ts` の内容を各テーブルに投入
3. `.env.example` を `.env.local` にコピーし、URL と anon key を設定
4. `src/lib/api.ts` の各関数を、コメントの `TODO(Supabase)` のクエリに置き換え（DB のスネークケース → キャメルケース変換を追加）
5. スポット写真は現在 Wikimedia Commons の画像を使用（`image_url` / `image_credit` にそのまま移行可）。自前の写真に替える場合は Storage バケット `spot-images` にアップロードし、公開URLを保存（未設定・読み込み失敗時は自動でプレースホルダー表示）

画面コンポーネントは `api.ts` 経由でしかデータを取得しないため、上記以外の変更は不要です。

## 本番公開前に検討すること
- **道のり計算**：OSRM デモサーバーは試作用で、利用制限・可用性の保証がありません。Supabase Edge Functions から Google Routes API などを呼ぶ構成に置き換えてください。
- **県境データ**：地球地図日本の利用条件（出典明記、営利目的の場合は利用報告）を確認してください。
- **写真**：CC BY-SA などのライセンス条件（クレジット表示）を維持してください。
- **飲食店の情報**：営業時間・定休日・営業状況は変わりやすいため掲載していません。Supabase 化の際は管理画面から更新できるようにし、公開前に各店の最新情報を確認してください。
- **写真の配信**：Wikimedia から直接読み込むと、アクセスが多い場合に制限されることがあります。Supabase Storage に保存して配信する構成を推奨します。
- **掲載情報**：アクセス・所要時間などはサンプルの目安です。公開前に最新情報をご確認ください。
