import type { Category, CategoryId, CrowdLevel, Prefecture, PrefectureId, Spot, SpotKind, TourRoute, TransportMode } from "@/types";

export const PREFECTURES: Prefecture[] = [
  {
    id: "tokushima",
    name: "徳島県",
    shortName: "徳島",
    catchcopy: "渦と藍と、山あいの暮らし",
    description: "鳴門の渦潮から、祖谷の秘境集落まで。阿波藍や阿波おどりなど、手仕事と祭りの文化が息づく県。",
  },
  {
    id: "kagawa",
    name: "香川県",
    shortName: "香川",
    catchcopy: "瀬戸内の島と、門前のにぎわい",
    description: "日本一小さな県に、島々のアートや讃岐の信仰と芸能がぎゅっと詰まっている。うどん巡りの合間に足をのばして。",
  },
  {
    id: "ehime",
    name: "愛媛県",
    shortName: "愛媛",
    catchcopy: "湯の町と、木蝋の町並み",
    description: "道後温泉に代表される湯の文化と、内子・大洲に残る商家の町並み。しまなみ海道の島々も魅力。",
  },
  {
    id: "kochi",
    name: "高知県",
    shortName: "高知",
    catchcopy: "清流と太平洋、土佐の市",
    description: "四万十川・仁淀川の清流と、黒潮が洗う岬。日曜市や絵金など、土佐ならではの暮らしと芸能に出会える。",
  },
];

export const PREFECTURE_MAP = Object.fromEntries(PREFECTURES.map((p) => [p.id, p])) as Record<PrefectureId, Prefecture>;

/** 県カラーの Tailwind クラス（動的クラス生成を避けるため列挙） */
export const PREFECTURE_STYLE: Record<PrefectureId, { bg: string; text: string; border: string; soft: string }> = {
  tokushima: { bg: "bg-tokushima", text: "text-tokushima", border: "border-tokushima", soft: "bg-tokushima/10" },
  kagawa: { bg: "bg-kagawa", text: "text-kagawa", border: "border-kagawa", soft: "bg-kagawa/10" },
  ehime: { bg: "bg-ehime", text: "text-ehime", border: "border-ehime", soft: "bg-ehime/10" },
  kochi: { bg: "bg-kochi", text: "text-kochi", border: "border-kochi", soft: "bg-kochi/10" },
};

/** 地図（SVG）用の色。CSS 変数が使えないため値を直接持つ（index.css の --pref-* と同じ） */
export const MAP_COLORS = {
  tokushima: "hsl(222, 55%, 38%)",
  kagawa: "hsl(82, 32%, 38%)",
  ehime: "hsl(28, 85%, 50%)",
  kochi: "hsl(186, 60%, 32%)",
  primary: "hsl(214, 52%, 25%)",
  accent: "hsl(10, 68%, 50%)",
} as const;

export const CATEGORIES: Category[] = [
  { id: "nature", label: "自然・絶景" },
  { id: "history", label: "歴史・寺社" },
  { id: "townscape", label: "町並み" },
  { id: "art", label: "アート" },
  { id: "culture", label: "文化・暮らし" },
  { id: "food", label: "食・市場" },
  { id: "onsen", label: "温泉" },
  { id: "michinoeki", label: "道の駅" },
  { id: "gourmet", label: "名物グルメ" },
];

export const SPOT_KINDS: { id: SpotKind; label: string; glyph: string }[] = [
  { id: "sight", label: "観光", glyph: "" },
  { id: "michinoeki", label: "道の駅", glyph: "道" },
  { id: "gourmet", label: "グルメ", glyph: "食" },
];

export const SPOT_KIND_MAP = Object.fromEntries(SPOT_KINDS.map((k) => [k.id, k])) as Record<SpotKind, (typeof SPOT_KINDS)[number]>;

export function spotKind(spot: Pick<Spot, "categoryIds">): SpotKind {
  if (spot.categoryIds.includes("michinoeki")) return "michinoeki";
  if (spot.categoryIds.includes("gourmet")) return "gourmet";
  return "sight";
}

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<CategoryId, Category>;

export const CROWD_LABEL: Record<CrowdLevel, string> = {
  high: "混みやすい",
  medium: "ほどよい",
  low: "ゆったり",
};

export const TRANSPORT_LABEL: Record<TransportMode, string> = {
  car: "車",
  train: "電車",
  bus: "バス",
  walk: "徒歩",
  ferry: "フェリー",
};

export const DURATION_LABEL: Record<TourRoute["duration"], string> = {
  "half-day": "半日",
  day: "日帰り",
  overnight: "1泊2日",
};
