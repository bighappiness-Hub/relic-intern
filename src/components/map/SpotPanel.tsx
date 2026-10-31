import {
  ArrowLeft,
  ArrowRight,
  CalendarHeart,
  Car,
  Check,
  Clock,
  ExternalLink,
  Lightbulb,
  Loader2,
  MapPin,
  MousePointerClick,
  Navigation,
  Ruler,
  TrainFront,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { PhotoCredit } from "@/components/PhotoCredit";
import { SpotImage } from "@/components/SpotImage";
import { CrowdIndicator, PrefectureTag } from "@/components/Tags";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORY_MAP, PREFECTURES, SPOT_KIND_MAP, spotKind } from "@/data/master";
import { distanceKm, formatKm, googleDirectionsUrl, TRAVEL_MODE_LABEL, type DrivingRoute, type TravelMode } from "@/lib/geo";
import { cn, formatMinutes } from "@/lib/utils";
import type { Spot } from "@/types";

type Tab = "overview" | "directions" | "distance";

const TABS: { id: Tab; label: string; icon: typeof Navigation }[] = [
  { id: "overview", label: "概要", icon: MapPin },
  { id: "directions", label: "行き方", icon: Navigation },
  { id: "distance", label: "距離", icon: Ruler },
];

export interface DrivingState {
  loading: boolean;
  data: DrivingRoute | null;
  error: string | null;
}

interface Props {
  spot: Spot;
  allSpots: Spot[];
  compare?: Spot;
  driving: DrivingState;
  pickMode: boolean;
  tab: Tab;
  onTabChange: (tab: Tab) => void;
  onCompareChange: (id?: string) => void;
  onPickModeChange: (on: boolean) => void;
  onSelectSpot: (id: string) => void;
  onBack: () => void;
}

export function SpotPanel(props: Props) {
  const { spot, tab, onTabChange, onBack } = props;

  return (
    <div>
      <div className="relative aspect-[16/9] overflow-hidden md:rounded-t-xl">
        <SpotImage imageUrl={spot.imageUrl} alt={spot.name} prefectureId={spot.prefectureId} categoryId={spot.categoryIds[0]} />
        <Button
          size="sm"
          variant="secondary"
          onClick={onBack}
          className="absolute left-3 top-3 h-8 bg-background/90 shadow backdrop-blur"
          aria-label="スポット一覧に戻る"
        >
          <ArrowLeft /> 一覧
        </Button>
      </div>
      <div className="px-4 pt-2 md:px-5">
        <PhotoCredit credit={spot.imageCredit} />
      </div>

      <div className="space-y-3 px-4 pb-3 pt-3 md:px-5">
        <div className="flex flex-wrap items-center gap-1.5">
          <PrefectureTag id={spot.prefectureId} />
          {spot.categoryIds.map((c) => (
            <Badge key={c} variant="secondary" className="font-normal">
              {CATEGORY_MAP[c].label}
            </Badge>
          ))}
        </div>
        <div>
          <p className="text-[11px] tracking-wider text-muted-foreground">{spot.nameKana}</p>
          <h2 className="text-2xl font-bold leading-tight">{spot.name}</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">{spot.summary}</p>
        </div>
      </div>

      {/* タブ */}
      <div className="sticky top-0 z-10 border-y bg-card px-4 md:px-5" role="tablist">
        <div className="grid grid-cols-3">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => onTabChange(id)}
              className={cn(
                "flex items-center justify-center gap-1.5 border-b-2 py-2.5 text-sm font-medium transition-colors",
                tab === id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-4 md:px-5">
        {tab === "overview" && <Overview spot={spot} allSpots={props.allSpots} onSelectSpot={props.onSelectSpot} />}
        {tab === "directions" && <Directions spot={spot} allSpots={props.allSpots} />}
        {tab === "distance" && <Distance {...props} />}
      </div>
    </div>
  );
}

/* ───────── 概要 ───────── */
function Overview({ spot, allSpots, onSelectSpot }: { spot: Spot; allSpots: Spot[]; onSelectSpot: (id: string) => void }) {
  return (
    <div className="space-y-5">
      {spot.specialty && (
        <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-3.5">
          <UtensilsCrossed className="h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-[11px] text-muted-foreground">名物・おすすめ</p>
            <p className="font-bold">{spot.specialty}</p>
          </div>
        </div>
      )}
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-secondary/60 p-3">
          <dt className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> 滞在の目安
          </dt>
          <dd className="mt-1 font-medium">{formatMinutes(spot.stayMinutes)}</dd>
        </div>
        <div className="rounded-md bg-secondary/60 p-3">
          <dt className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <CalendarHeart className="h-3.5 w-3.5" /> おすすめの時期
          </dt>
          <dd className="mt-1 font-medium">{spot.bestSeason}</dd>
        </div>
      </dl>

      <p className="text-sm leading-relaxed text-foreground/85">{spot.description}</p>

      <ul className="space-y-1.5">
        {spot.highlights.map((h) => (
          <li key={h} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            {h}
          </li>
        ))}
      </ul>

      <div className="rounded-lg border border-accent/30 bg-accent/5 p-3.5">
        <div className="flex items-center justify-between gap-2">
          <p className="flex items-center gap-1.5 text-sm font-bold">
            <Lightbulb className="h-4 w-4 text-accent" />
            混雑をずらすヒント
          </p>
          <CrowdIndicator level={spot.crowdLevel} />
        </div>
        <p className="mt-2 text-sm leading-relaxed">{spot.crowdTip}</p>
      </div>

      <NearbyStops spot={spot} allSpots={allSpots} onSelectSpot={onSelectSpot} />

      <Button asChild className="w-full">
        <Link to={`/spots/${spot.id}`}>
          詳しいページを見る <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}

/**
 * 近くの立ち寄り先。
 * 観光スポットには近くの道の駅・グルメを、道の駅・グルメには近くの観光スポットを提案し、
 * 周辺へ人の流れを広げる。
 */
function NearbyStops({ spot, allSpots, onSelectSpot }: { spot: Spot; allSpots: Spot[]; onSelectSpot: (id: string) => void }) {
  const isSight = spotKind(spot) === "sight";
  const items = useMemo(() => {
    const near = allSpots
      .filter((s) => s.id !== spot.id && (spotKind(s) === "sight") !== isSight)
      .map((s) => ({ s, km: distanceKm(spot, s) }))
      .filter(({ km }) => km <= 40)
      .sort((a, b) => a.km - b.km);
    if (!isSight) return near.slice(0, 3);
    // 道の駅・グルメをそれぞれ最大2件ずつ
    const pick = (k: string) => near.filter(({ s }) => spotKind(s) === k).slice(0, 2);
    return [...pick("michinoeki"), ...pick("gourmet")].sort((a, b) => a.km - b.km);
  }, [allSpots, spot, isSight]);

  if (items.length === 0) return null;
  return (
    <div>
      <p className="mb-2 text-sm font-bold">{isSight ? "近くで休憩・食事" : "あわせて巡りたい近くのスポット"}</p>
      <ul className="divide-y rounded-lg border">
        {items.map(({ s, km }) => (
          <li key={s.id}>
            <button type="button" onClick={() => onSelectSpot(s.id)} className="flex w-full items-center gap-3 p-2.5 text-left transition-colors hover:bg-secondary/60">
              <div className="h-11 w-11 shrink-0 overflow-hidden rounded">
                <SpotImage imageUrl={s.imageUrl} alt="" prefectureId={s.prefectureId} categoryId={s.categoryIds[0]} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-sm">
                  {spotKind(s) !== "sight" && !s.name.startsWith("道の駅") && (
                    <span className="shrink-0 rounded bg-primary/10 px-1 text-[10px] font-bold text-primary">{SPOT_KIND_MAP[spotKind(s)].label}</span>
                  )}
                  <span className="truncate font-medium">{s.name}</span>
                </p>
                <p className="truncate text-xs text-muted-foreground">{s.specialty ?? s.summary}</p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">{formatKm(km)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ───────── 行き方 ───────── */
type OriginType = "current" | "spot" | "text";

function Directions({ spot, allSpots }: { spot: Spot; allSpots: Spot[] }) {
  const [originType, setOriginType] = useState<OriginType>("current");
  const [originSpotId, setOriginSpotId] = useState("");
  const [originText, setOriginText] = useState("");
  const [mode, setMode] = useState<TravelMode>("driving");

  const originSpot = allSpots.find((s) => s.id === originSpotId);
  const origin = originType === "spot" ? originSpot : originType === "text" ? originText.trim() || undefined : undefined;
  const disabled = (originType === "spot" && !originSpot) || (originType === "text" && !originText.trim());

  return (
    <div className="space-y-5">
      <div className="rounded-md bg-secondary/60 p-3 text-sm">
        <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <TrainFront className="h-3.5 w-3.5" /> アクセスの目安
        </p>
        <p className="mt-1">{spot.access}</p>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-bold">出発地</legend>
        <div className="space-y-2">
          {(
            [
              ["current", "現在地から"],
              ["spot", "ほかのスポットから"],
              ["text", "駅名・住所を入力"],
            ] as [OriginType, string][]
          ).map(([value, label]) => (
            <label key={value} className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="origin"
                value={value}
                checked={originType === value}
                onChange={() => setOriginType(value)}
                className="h-4 w-4 accent-[hsl(var(--primary))]"
              />
              {label}
            </label>
          ))}
        </div>
        {originType === "spot" && (
          <SpotSelect className="mt-3" spots={allSpots} from={spot} value={originSpotId} onChange={setOriginSpotId} placeholder="出発するスポットを選択" />
        )}
        {originType === "text" && (
          <Input className="mt-3" value={originText} onChange={(e) => setOriginText(e.target.value)} placeholder="例：高松駅、松山空港" />
        )}
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-bold">移動手段</legend>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(TRAVEL_MODE_LABEL) as TravelMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={cn(
                "rounded-md border px-2 py-2 text-xs font-medium transition-colors",
                mode === m ? "border-primary bg-primary text-primary-foreground" : "bg-card hover:border-primary",
              )}
            >
              {TRAVEL_MODE_LABEL[m]}
            </button>
          ))}
        </div>
      </fieldset>

      <Button asChild={!disabled} disabled={disabled} className="w-full" size="lg">
        {disabled ? (
          <span>Googleマップで経路を検索</span>
        ) : (
          <a href={googleDirectionsUrl(spot, mode, origin)} target="_blank" rel="noopener noreferrer">
            <Navigation /> Googleマップで経路を検索 <ExternalLink />
          </a>
        )}
      </Button>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Googleマップが新しいタブで開きます。「現在地から」を選ぶと、Googleマップ側で位置情報の利用確認が表示されます。
      </p>
    </div>
  );
}

/* ───────── 距離 ───────── */
function Distance({ spot, allSpots, compare, driving, pickMode, onCompareChange, onPickModeChange, onSelectSpot }: Props) {
  const nearest = useMemo(
    () =>
      allSpots
        .filter((s) => s.id !== spot.id)
        .map((s) => ({ s, km: distanceKm(spot, s) }))
        .sort((a, b) => a.km - b.km)
        .slice(0, 4),
    [allSpots, spot],
  );

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-bold">比べるスポット</p>
        <SpotSelect spots={allSpots} from={spot} value={compare?.id ?? ""} onChange={(id) => onCompareChange(id || undefined)} placeholder="スポットを選択（近い順）" />
        <Button
          variant={pickMode ? "default" : "outline"}
          size="sm"
          className="mt-2 w-full"
          onClick={() => onPickModeChange(!pickMode)}
        >
          <MousePointerClick />
          {pickMode ? "地図上のポイントをクリックしてください…" : "地図上のポイントから選ぶ"}
        </Button>
      </div>

      {!compare && (
        <div>
          <p className="mb-2 text-xs text-muted-foreground">近くのスポット</p>
          <div className="flex flex-wrap gap-2">
            {nearest.map(({ s, km }) => (
              <button
                key={s.id}
                type="button"
                onClick={() => onCompareChange(s.id)}
                className="rounded-full border bg-card px-3 py-1 text-xs transition-colors hover:border-primary hover:text-primary"
              >
                {s.name}
                <span className="ml-1 text-muted-foreground">{formatKm(km)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {compare && (
        <div className="overflow-hidden rounded-lg border">
          <div className="flex items-center justify-between gap-2 bg-secondary/60 px-3.5 py-2.5 text-sm">
            <p className="flex min-w-0 items-center gap-1.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">A</span>
              <span className="truncate font-medium">{spot.name}</span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">B</span>
              <span className="truncate font-medium">{compare.name}</span>
            </p>
            <button type="button" onClick={() => onCompareChange(undefined)} aria-label="比較をやめる" className="shrink-0 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <dl className="grid grid-cols-2 divide-x">
            <div className="p-3.5">
              <dt className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Ruler className="h-3.5 w-3.5" /> 直線距離
              </dt>
              <dd className="mt-1 text-xl font-bold">{formatKm(distanceKm(spot, compare))}</dd>
            </div>
            <div className="p-3.5">
              <dt className="flex items-center gap-1 text-[11px] text-muted-foreground">
                <Car className="h-3.5 w-3.5" /> 車での道のり
              </dt>
              <dd className="mt-1">
                {driving.loading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : driving.data ? (
                  <>
                    <span className="text-xl font-bold">{formatKm(driving.data.km)}</span>
                    <span className="block text-xs text-muted-foreground">約{formatMinutes(driving.data.minutes)}</span>
                  </>
                ) : (
                  <span className="text-xs text-muted-foreground">{driving.error ?? "—"}</span>
                )}
              </dd>
            </div>
          </dl>
          <div className="space-y-2 border-t p-3.5">
            <Button asChild variant="outline" size="sm" className="w-full">
              <a href={googleDirectionsUrl(compare, "driving", spot)} target="_blank" rel="noopener noreferrer">
                Googleマップでこの2地点の経路を見る <ExternalLink />
              </a>
            </Button>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => onSelectSpot(compare.id)}>
              {compare.name} の詳細を見る <ArrowRight />
            </Button>
          </div>
        </div>
      )}
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        道のり・所要時間は目安です（OSRM による自動計算。フェリー区間などは正確でない場合があります）。
      </p>
    </div>
  );
}

/** 県ごとにグループ化し、基準スポットから近い順に並べたセレクト */
function SpotSelect({
  spots,
  from,
  value,
  onChange,
  placeholder,
  className,
}: {
  spots: Spot[];
  from: Spot;
  value: string;
  onChange: (id: string) => void;
  placeholder: string;
  className?: string;
}) {
  const groups = useMemo(
    () =>
      PREFECTURES.map((p) => ({
        pref: p,
        items: spots
          .filter((s) => s.prefectureId === p.id && s.id !== from.id)
          .map((s) => ({ s, km: distanceKm(from, s) }))
          .sort((a, b) => a.km - b.km),
      })).sort((a, b) => (a.pref.id === from.prefectureId ? -1 : b.pref.id === from.prefectureId ? 1 : 0)),
    [spots, from],
  );

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <option value="">{placeholder}</option>
      {groups.map(({ pref, items }) => (
        <optgroup key={pref.id} label={pref.name}>
          {items.map(({ s, km }) => (
            <option key={s.id} value={s.id}>
              {s.name}（{formatKm(km)}）
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}

export type { Tab as SpotPanelTab };
