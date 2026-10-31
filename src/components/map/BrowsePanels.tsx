import { ArrowRight, ChevronRight, Route as RouteIcon } from "lucide-react";
import { Link } from "react-router-dom";

import { SpotImage } from "@/components/SpotImage";
import { CrowdIndicator } from "@/components/Tags";
import { PREFECTURES, PREFECTURE_MAP, PREFECTURE_STYLE, SPOT_KIND_MAP, spotKind } from "@/data/master";
import { cn } from "@/lib/utils";
import type { PrefectureId, Spot } from "@/types";

/** 初期表示：県を選んでもらうパネル */
export function WelcomePanel({ onSelectPrefecture }: { onSelectPrefecture: (id: PrefectureId) => void }) {
  return (
    <div className="space-y-5 p-5">
      <div>
        <h1 className="text-2xl font-bold leading-snug">
          まだ知らない四国に、
          <br />
          会いにいく。
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          地図から県を選ぶと、その県のスポットが表示されます。有名な場所も小さな場所も、同じ扱いで紹介しています。
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {PREFECTURES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => onSelectPrefecture(p.id)}
            className={cn("group relative overflow-hidden rounded-lg p-3 text-left text-white transition-transform hover:-translate-y-0.5", PREFECTURE_STYLE[p.id].bg)}
          >
            <div className="bg-seigaiha absolute inset-0 text-white/10" />
            <p className="relative font-serif text-lg font-bold tracking-widest">{p.shortName}</p>
            <p className="relative mt-0.5 line-clamp-1 text-[11px] text-white/85">{p.catchcopy}</p>
          </button>
        ))}
      </div>
      <Link
        to="/routes"
        className="flex items-center justify-between rounded-lg border bg-secondary/40 p-3 text-sm transition-colors hover:border-primary"
      >
        <span className="flex items-center gap-2">
          <RouteIcon className="h-4 w-4 text-accent" />
          名所と周辺をつなぐ周遊ルート
        </span>
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/** 県を選んだあと：その県のスポット一覧 */
export function PrefecturePanel({ prefectureId, spots, onSelectSpot }: { prefectureId: PrefectureId; spots: Spot[]; onSelectSpot: (spot: Spot) => void }) {
  const pref = PREFECTURE_MAP[prefectureId];
  return (
    <div>
      <div className={cn("relative overflow-hidden p-5 text-white md:rounded-t-xl", PREFECTURE_STYLE[prefectureId].bg)}>
        <div className="bg-seigaiha absolute inset-0 text-white/10" />
        <div className="relative">
          <h2 className="text-2xl font-bold tracking-widest">{pref.name}</h2>
          <p className="mt-1 font-serif">{pref.catchcopy}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/85">{pref.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-5 pb-2 pt-4">
        <p className="text-sm font-bold">スポット {spots.length}件</p>
        <Link to={`/routes?pref=${prefectureId}`} className="inline-flex items-center gap-0.5 text-xs text-primary hover:underline">
          周遊ルート <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <p className="px-5 pb-2 text-[11px] text-muted-foreground">表示順はランダムです。地図のポイントからも選べます。上の「観光／道の駅／グルメ」で表示を切り替えられます。</p>
      <ul className="divide-y">
        {spots.map((s) => (
          <li key={s.id}>
            <button type="button" onClick={() => onSelectSpot(s)} className="flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-secondary/60">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md">
                <SpotImage imageUrl={s.imageUrl} alt="" prefectureId={s.prefectureId} categoryId={s.categoryIds[0]} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5">
                  {spotKind(s) !== "sight" && !s.name.startsWith("道の駅") && (
                    <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">{SPOT_KIND_MAP[spotKind(s)].label}</span>
                  )}
                  <span className="truncate font-bold">{s.name}</span>
                </p>
                <p className="truncate text-xs text-muted-foreground">{s.specialty ? `名物：${s.specialty}` : s.summary}</p>
                <CrowdIndicator level={s.crowdLevel} className="mt-1" />
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
