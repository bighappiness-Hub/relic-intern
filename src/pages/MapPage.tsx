import { ChevronDown, ChevronUp, MousePointerClick, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PrefecturePanel, WelcomePanel } from "@/components/map/BrowsePanels";
import { ShikokuMap, type MapPadding } from "@/components/map/ShikokuMap";
import { SpotPanel, type DrivingState, type SpotPanelTab } from "@/components/map/SpotPanel";
import { PREFECTURES, PREFECTURE_MAP, PREFECTURE_STYLE, SPOT_KINDS, spotKind } from "@/data/master";
import { useAsync } from "@/hooks/use-async";
import { useMediaQuery } from "@/hooks/use-media-query";
import { getSpots } from "@/lib/api";
import { fetchDrivingRoute } from "@/lib/geo";
import { cn, sessionShuffle } from "@/lib/utils";
import type { PrefectureId, Spot, SpotKind } from "@/types";

/**
 * トップ：画面いっぱいの地図。
 * 状態は URL（?pref=&spot=&to=）に持たせ、共有やブラウザの「戻る」に対応しています。
 */
export function MapPage() {
  const [params, setParams] = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { data: allSpots } = useAsync(() => getSpots(), []);

  const spots = useMemo(() => allSpots ?? [], [allSpots]);
  const selected = spots.find((s) => s.id === params.get("spot"));
  const compare = selected ? spots.find((s) => s.id === params.get("to") && s.id !== selected.id) : undefined;
  const prefParam = params.get("pref") as PrefectureId | null;
  const prefectureId = selected?.prefectureId ?? (prefParam && PREFECTURE_MAP[prefParam] ? prefParam : undefined);

  const [tab, setTab] = useState<SpotPanelTab>("overview");
  const [pickMode, setPickMode] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);

  // スポットが変わったらパネルを先頭へ
  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0 });
  }, [selected?.id, prefectureId]);

  // 比較先が決まったら、車での道のりを取得
  const [driving, setDriving] = useState<DrivingState>({ loading: false, data: null, error: null });
  useEffect(() => {
    if (!selected || !compare) {
      setDriving({ loading: false, data: null, error: null });
      return;
    }
    const ctrl = new AbortController();
    setDriving({ loading: true, data: null, error: null });
    fetchDrivingRoute(selected, compare, ctrl.signal)
      .then((data) => setDriving({ loading: false, data, error: null }))
      .catch(() => !ctrl.signal.aborted && setDriving({ loading: false, data: null, error: "取得できませんでした" }));
    return () => ctrl.abort();
  }, [selected, compare]);

  // 表示する種類（観光／道の駅／グルメ）
  const [kinds, setKinds] = useState<SpotKind[]>(SPOT_KINDS.map((k) => k.id));
  const toggleKind = (id: SpotKind) =>
    setKinds((prev) => (prev.includes(id) ? (prev.length > 1 ? prev.filter((k) => k !== id) : prev) : [...prev, id]));
  const visibleSpots = useMemo(() => spots.filter((s) => kinds.includes(spotKind(s))), [spots, kinds]);

  // 地図に表示するポイント
  const prefSpots = useMemo(
    () => (prefectureId ? sessionShuffle(visibleSpots.filter((s) => s.prefectureId === prefectureId)) : []),
    [visibleSpots, prefectureId],
  );
  const markers = useMemo(() => {
    const list = pickMode ? [...visibleSpots] : [...prefSpots];
    // 選択中・比較中のポイントは種類の絞り込みに関係なく表示
    for (const s of [selected, compare]) if (s && !list.includes(s)) list.push(s);
    return list;
  }, [pickMode, visibleSpots, prefSpots, selected, compare]);

  const go = (next: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    Object.entries(next).forEach(([k, v]) => v && p.set(k, v));
    setParams(p);
  };

  const selectPrefecture = (id?: PrefectureId) => {
    setPickMode(false);
    setSheetOpen(true);
    go({ pref: id });
  };

  const selectSpot = (spot: Spot) => {
    if (pickMode && selected && spot.id !== selected.id) {
      setPickMode(false);
      setTab("distance");
      go({ spot: selected.id, to: spot.id });
      return;
    }
    setPickMode(false);
    setTab("overview");
    setSheetOpen(true);
    go({ spot: spot.id });
  };

  // パネルに隠れないよう地図の余白を決める
  const padding: MapPadding = useMemo(
    () =>
      isDesktop
        ? { topLeft: [430, 110], bottomRight: [40, 40] }
        : { topLeft: [24, 120], bottomRight: [24, sheetOpen ? Math.round(window.innerHeight * 0.5) : 90] },
    [isDesktop, sheetOpen],
  );

  const panel = selected ? (
    <SpotPanel
      spot={selected}
      allSpots={spots}
      compare={compare}
      driving={driving}
      pickMode={pickMode}
      tab={tab}
      onTabChange={setTab}
      onCompareChange={(id) => go({ spot: selected.id, to: id })}
      onPickModeChange={(on) => {
        setPickMode(on);
        if (on && !isDesktop) setSheetOpen(false);
      }}
      onSelectSpot={(id) => {
        setTab("overview");
        go({ spot: id });
      }}
      onBack={() => selectPrefecture(selected.prefectureId)}
    />
  ) : prefectureId ? (
    <PrefecturePanel prefectureId={prefectureId} spots={prefSpots} onSelectSpot={selectSpot} />
  ) : (
    <WelcomePanel onSelectPrefecture={selectPrefecture} />
  );

  const sheetTitle = selected?.name ?? (prefectureId ? PREFECTURE_MAP[prefectureId].name : "県を選んでください");

  return (
    <div className="relative h-[calc(100dvh-4rem)] overflow-hidden">
      {/* 地図 */}
      <div className="absolute inset-0 isolate">
        <ShikokuMap
          prefectureId={prefectureId}
          spots={markers}
          selected={selected}
          compare={compare}
          routePath={driving.data?.path}
          padding={padding}
          onSelectPrefecture={selectPrefecture}
          onSelectSpot={selectSpot}
        />
      </div>

      {/* 県の切り替え */}
      <div className="pointer-events-none absolute inset-x-3 top-3 z-10 md:left-[412px] md:right-4 md:top-4">
        <div className="pointer-events-auto -mx-3 flex gap-2 overflow-x-auto px-3 pb-1 md:mx-0 md:flex-wrap md:px-0">
          <PrefChip active={!prefectureId} onClick={() => selectPrefecture(undefined)}>
            四国全体
          </PrefChip>
          {PREFECTURES.map((p) => (
            <PrefChip key={p.id} active={prefectureId === p.id} activeClass={PREFECTURE_STYLE[p.id].bg} onClick={() => selectPrefecture(p.id)}>
              {p.shortName}
            </PrefChip>
          ))}
        </div>
        <div className="pointer-events-auto mt-2 inline-flex rounded-full border bg-card/95 p-1 shadow-md backdrop-blur" role="group" aria-label="表示する種類">
          {SPOT_KINDS.map((k) => {
            const on = kinds.includes(k.id);
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => toggleKind(k.id)}
                aria-pressed={on}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  on ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {k.glyph && <span className="font-serif">{k.glyph}</span>}
                {k.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ポイント選択モードの案内 */}
      {pickMode && (
        <div className="absolute left-1/2 top-24 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground shadow-lg md:left-[calc(50%+200px)] md:top-28">
          <MousePointerClick className="h-4 w-4" />
          比べたいポイントをクリック
          <button type="button" onClick={() => setPickMode(false)} aria-label="選択をやめる" className="ml-1 rounded-full p-0.5 hover:bg-white/20">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* パネル：PC は左側、スマホは下からのシート */}
      {isDesktop ? (
        <aside ref={panelRef} className="absolute left-4 top-4 z-10 max-h-[calc(100%-2rem)] w-[380px] overflow-y-auto rounded-xl border bg-card shadow-xl">
          {panel}
        </aside>
      ) : (
        <aside
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 flex flex-col rounded-t-2xl border-t bg-card shadow-[0_-8px_24px_rgba(0,0,0,0.15)] transition-[max-height] duration-300",
            sheetOpen ? "max-h-[58%]" : "max-h-[64px]",
          )}
        >
          <button
            type="button"
            onClick={() => setSheetOpen((o) => !o)}
            className={cn("flex shrink-0 items-center justify-between gap-2 px-4", sheetOpen ? "h-8" : "pb-2 pt-2.5")}
            aria-expanded={sheetOpen}
          >
            <span className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-border" />
            <span className="mt-1.5 truncate font-serif text-base font-bold">{sheetOpen ? "" : sheetTitle}</span>
            {sheetOpen ? <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-muted-foreground" /> : <ChevronUp className="mt-1.5 h-5 w-5 shrink-0" />}
          </button>
          <div ref={panelRef} className={cn("min-h-0 flex-1 overflow-y-auto", !sheetOpen && "hidden")}>
            {panel}
          </div>
        </aside>
      )}
    </div>
  );
}

function PrefChip({ active, activeClass = "bg-primary", onClick, children }: { active: boolean; activeClass?: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium shadow-md transition-colors",
        active ? cn("border-transparent text-white", activeClass) : "bg-card/95 backdrop-blur hover:border-primary hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}
