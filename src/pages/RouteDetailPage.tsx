import { CalendarDays, ChevronRight, Clock, Lightbulb, MapPin, Navigation } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { SpotImage } from "@/components/SpotImage";
import { CrowdIndicator, PrefectureTag } from "@/components/Tags";
import { Skeleton } from "@/components/ui/skeleton";
import { DURATION_LABEL, TRANSPORT_LABEL } from "@/data/master";
import { useAsync } from "@/hooks/use-async";
import { getRoute, getSpotsByIds } from "@/lib/api";
import { cn, formatMinutes } from "@/lib/utils";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function RouteDetailPage() {
  const { id = "" } = useParams();
  const { data, loading } = useAsync(async () => {
    const route = await getRoute(id);
    if (!route) return null;
    const spots = await getSpotsByIds(route.stops.map((s) => s.spotId));
    return { route, spots };
  }, [id]);

  if (loading) {
    return (
      <div className="container py-10">
        <Skeleton className="h-64 w-full" />
        <Skeleton className="mt-8 h-40 w-full" />
      </div>
    );
  }
  if (!data) return <NotFoundPage />;

  const { route, spots } = data;
  const totalStay = route.stops.reduce((sum, s) => sum + s.stayMinutes, 0);
  const totalMove = route.stops.reduce((sum, s) => sum + (s.moveToNext?.minutes ?? 0), 0);

  return (
    <article className="pb-8">
      {/* ヘッダー */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <SpotImage imageUrl={route.imageUrl} alt="" prefectureId={route.prefectureIds[0]} showIcon={false} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="container relative py-12 text-white md:py-20">
          <nav aria-label="パンくずリスト" className="mb-6 flex items-center gap-1 text-xs text-white/80">
            <Link to="/" className="hover:underline">トップ</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/routes" className="hover:underline">周遊ルート</Link>
          </nav>
          <div className="flex gap-1.5">
            {route.prefectureIds.map((p) => (
              <PrefectureTag key={p} id={p} className="ring-1 ring-white/40" />
            ))}
          </div>
          <h1 className="mt-4 max-w-3xl text-balance text-3xl font-bold leading-snug md:text-5xl">{route.title}</h1>
          <p className="mt-3 text-white/90 md:text-lg">{route.subtitle}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{DURATION_LABEL[route.duration]}</span>
            <span className="inline-flex items-center gap-1.5"><Navigation className="h-4 w-4" />主な移動：{TRANSPORT_LABEL[route.transport]}</span>
            <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" />{route.stops.length}か所</span>
            <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" />滞在 約{formatMinutes(totalStay)}・移動 約{formatMinutes(totalMove)}</span>
          </div>
        </div>
      </section>

      <div className="container mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="leading-loose text-foreground/85">{route.summary}</p>

          {/* タイムライン */}
          <h2 className="mt-10 text-2xl font-bold">行程</h2>
          <ol className="mt-6">
            {route.stops.map((stop, i) => {
              const spot = spots.find((s) => s.id === stop.spotId);
              if (!spot) return null;
              const isHub = stop.role === "hub";
              return (
                <li key={stop.spotId} className="relative pl-12 md:pl-14">
                  {/* 縦線 */}
                  {i < route.stops.length - 1 && <span className="absolute bottom-0 left-[17px] top-10 w-0.5 bg-border md:left-[21px]" />}
                  {/* 番号 */}
                  <span
                    className={cn(
                      "absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full font-serif text-sm font-bold md:h-11 md:w-11 md:text-base",
                      isHub ? "bg-accent text-accent-foreground" : "border-2 border-primary bg-background text-primary",
                    )}
                  >
                    {i + 1}
                  </span>

                  <Link to={`/spots/${spot.id}`} className="group block overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-md">
                    <div className="flex flex-col sm:flex-row">
                      <div className="aspect-[5/2] sm:aspect-auto sm:w-40 sm:shrink-0">
                        <SpotImage imageUrl={spot.imageUrl} alt={spot.name} prefectureId={spot.prefectureId} categoryId={spot.categoryIds[0]} />
                      </div>
                      <div className="flex-1 p-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={cn("rounded px-1.5 py-0.5 text-[11px] font-bold", isHub ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary")}>
                            {isHub ? "起点スポット" : "周辺スポット"}
                          </span>
                          <span className="text-xs text-muted-foreground">滞在 約{formatMinutes(stop.stayMinutes)}</span>
                        </div>
                        <h3 className="mt-2 text-lg font-bold group-hover:text-primary">{spot.name}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{stop.note}</p>
                        <CrowdIndicator level={spot.crowdLevel} className="mt-3" />
                      </div>
                    </div>
                  </Link>

                  {stop.moveToNext ? (
                    <p className="py-5 text-xs text-muted-foreground">
                      ↓ {TRANSPORT_LABEL[stop.moveToNext.mode]}で約{formatMinutes(stop.moveToNext.minutes)}
                    </p>
                  ) : (
                    <div className="h-4" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-accent/30 bg-accent/5 p-5">
            <h2 className="flex items-center gap-1.5 font-serif text-base font-bold">
              <Lightbulb className="h-4 w-4 text-accent" />
              このルートのコツ
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed">
              {route.tips.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-accent">・</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
            <p className="mb-2 font-serif text-base font-bold text-foreground">ルートの考え方</p>
            名所（起点スポット）だけを訪れるのではなく、近くの周辺スポットと組み合わせることで、混雑する時間をずらしながら地域をより深く楽しめるよう構成しています。
          </div>
        </aside>
      </div>
    </article>
  );
}
