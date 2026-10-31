/**
 * ドメイン型。
 * Supabase のテーブル（supabase/schema.sql）と 1:1 で対応させています。
 * DB はスネークケース、フロントはキャメルケースで扱い、変換は src/lib/api.ts で行います。
 */

export type PrefectureId = "tokushima" | "kagawa" | "ehime" | "kochi";

export interface Prefecture {
  id: PrefectureId;
  name: string; // 徳島県
  shortName: string; // 徳島
  catchcopy: string;
  description: string;
}

export type CategoryId = "nature" | "history" | "townscape" | "art" | "culture" | "food" | "onsen" | "michinoeki" | "gourmet";

/** 地図での表示種別（観光スポット／道の駅／グルメ） */
export type SpotKind = "sight" | "michinoeki" | "gourmet";

export interface Category {
  id: CategoryId;
  label: string;
}

/** 混雑しやすさ（ランキングではなく、時間帯をずらす判断材料として表示） */
export type CrowdLevel = "high" | "medium" | "low";

export interface Spot {
  id: string; // slug（URL に使用）
  name: string;
  nameKana: string;
  prefectureId: PrefectureId;
  city: string;
  categoryIds: CategoryId[];
  summary: string;
  description: string;
  highlights: string[];
  access: string;
  stayMinutes: number;
  bestSeason: string;
  crowdLevel: CrowdLevel;
  crowdTip: string;
  lat: number;
  lng: number;
  imageUrl: string | null; // Supabase Storage の公開 URL を想定
  imageCredit: ImageCredit | null;
  /** 名物・おすすめ（道の駅・飲食店向け） */
  specialty: string | null;
}

/** 写真のクレジット（CC ライセンスの表示義務に対応） */
export interface ImageCredit {
  author: string;
  license: string;
  sourceUrl: string;
  /** 補足（例：写真は料理のイメージです） */
  note?: string;
}

export type TransportMode = "car" | "train" | "bus" | "walk" | "ferry";

export interface RouteStop {
  spotId: string;
  order: number;
  /** hub: 人が集まりやすい起点スポット / nearby: あわせて巡りたい周辺スポット */
  role: "hub" | "nearby";
  stayMinutes: number;
  note: string;
  /** 次の立ち寄り先への移動（最後の地点は null） */
  moveToNext: { mode: TransportMode; minutes: number } | null;
}

export interface TourRoute {
  id: string;
  title: string;
  subtitle: string;
  prefectureIds: PrefectureId[];
  duration: "half-day" | "day" | "overnight";
  transport: TransportMode;
  summary: string;
  stops: RouteStop[];
  tips: string[];
  imageUrl: string | null;
}

/** 一覧検索の条件（Supabase のクエリに変換しやすい形） */
export interface SpotFilter {
  prefectureId?: PrefectureId;
  categoryId?: CategoryId;
  keyword?: string;
  /** 混みやすいスポットを除外（ゆったり巡りたい人向け） */
  excludeCrowded?: boolean;
}
