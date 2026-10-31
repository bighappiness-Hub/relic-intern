import { useSearchParams } from "react-router-dom";

import { RouteCard, RouteCardSkeleton } from "@/components/RouteCard";
import { DURATION_LABEL, PREFECTURES, PREFECTURE_STYLE } from "@/data/master";
import { useAsync } from "@/hooks/use-async";
import { getRoutes } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { PrefectureId, TourRoute } from "@/types";

const DURATIONS = Object.entries(DURATION_LABEL) as [TourRoute["duration"], string][];

export function RoutesPage() {
  const [params, setParams] = useSearchParams();
  const prefectureId = (params.get("pref") as PrefectureId) || undefined;
  const duration = params.get("duration") as TourRoute["duration"] | null;

  const { data, loading } = useAsync(() => getRoutes(prefectureId), [prefectureId]);
  const routes = data?.filter((r) => !duration || r.duration === duration);

  const update = (key: string, value?: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const chip = (active: boolean, activeClass = "bg-primary") =>
    cn(
      "shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
      active ? cn("border-transparent text-white", activeClass) : "bg-card hover:border-primary hover:text-primary",
    );

  return (
    <div className="container py-10 md:py-14">
      <header className="mb-8">
        <p className="mb-2 text-xs font-medium tracking-[0.3em] text-accent">MODEL ROUTES</p>
        <h1 className="text-3xl font-bold md:text-4xl">周遊ルート</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          人が集まりやすい名所を起点に、近くの魅力的なスポットを組み合わせたモデルルートです。混雑する時間をずらしながら、効率よく深く巡れるよう組み立てています。
        </p>
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent" /> 起点スポット（人が集まりやすい名所）
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-primary" /> 周辺スポット（あわせて巡りたい場所）
          </span>
        </div>
      </header>

      <div className="mb-8 space-y-3">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
          <button type="button" className={chip(!prefectureId)} onClick={() => update("pref")}>
            四国全域
          </button>
          {PREFECTURES.map((p) => (
            <button key={p.id} type="button" className={chip(prefectureId === p.id, PREFECTURE_STYLE[p.id].bg)} onClick={() => update("pref", p.id)}>
              {p.name}
            </button>
          ))}
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
          <button type="button" className={chip(!duration)} onClick={() => update("duration")}>
            すべての日程
          </button>
          {DURATIONS.map(([key, label]) => (
            <button key={key} type="button" className={chip(duration === key)} onClick={() => update("duration", key)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {loading || !routes
          ? Array.from({ length: 4 }).map((_, i) => <RouteCardSkeleton key={i} />)
          : routes.map((r) => <RouteCard key={r.id} route={r} />)}
      </div>
      {!loading && routes?.length === 0 && (
        <p className="rounded-lg border border-dashed py-16 text-center text-sm text-muted-foreground">
          条件に合うルートはまだありません。ほかの条件でお探しください。
        </p>
      )}
    </div>
  );
}
