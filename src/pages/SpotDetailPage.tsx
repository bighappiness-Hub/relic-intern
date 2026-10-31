import { CalendarHeart, Check, ChevronRight, Clock, ExternalLink, Lightbulb, MapPin, MapPinned, TrainFront } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { RouteCard } from "@/components/RouteCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SpotCard } from "@/components/SpotCard";
import { PhotoCredit } from "@/components/PhotoCredit";
import { SpotImage } from "@/components/SpotImage";
import { CrowdIndicator, PrefectureTag } from "@/components/Tags";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_MAP, PREFECTURE_MAP } from "@/data/master";
import { useAsync } from "@/hooks/use-async";
import { getNearbySpots, getRoutesBySpot, getSpot } from "@/lib/api";
import { formatMinutes } from "@/lib/utils";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function SpotDetailPage() {
  const { id = "" } = useParams();
  const { data, loading } = useAsync(async () => {
    const spot = await getSpot(id);
    if (!spot) return null;
    const [nearby, routes] = await Promise.all([getNearbySpots(spot, 3), getRoutesBySpot(spot.id)]);
    return { spot, nearby, routes };
  }, [id]);

  if (loading) {
    return (
      <div className="container py-10">
        <Skeleton className="mb-6 h-4 w-48" />
        <Skeleton className="aspect-[21/9] w-full" />
        <Skeleton className="mt-8 h-10 w-1/2" />
        <Skeleton className="mt-4 h-24 w-full" />
      </div>
    );
  }
  if (!data) return <NotFoundPage />;

  const { spot, nearby, routes } = data;
  const pref = PREFECTURE_MAP[spot.prefectureId];
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${spot.lat},${spot.lng}`;

  const infoRows = [
    { icon: TrainFront, label: "アクセス", value: spot.access },
    { icon: Clock, label: "滞在時間の目安", value: formatMinutes(spot.stayMinutes) },
    { icon: CalendarHeart, label: "おすすめの時期", value: spot.bestSeason },
    { icon: MapPin, label: "所在地", value: `${pref.name}${spot.city}` },
  ];

  return (
    <article className="pb-8">
      {/* パンくず */}
      <nav aria-label="パンくずリスト" className="container flex flex-wrap items-center gap-1 pt-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-primary">トップ</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to={`/?pref=${spot.prefectureId}`} className="hover:text-primary">{pref.name}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">{spot.name}</span>
      </nav>

      <div className="container mt-4">
        <div className="aspect-[16/9] overflow-hidden rounded-lg md:aspect-[21/9]">
          <SpotImage imageUrl={spot.imageUrl} alt={spot.name} prefectureId={spot.prefectureId} categoryId={spot.categoryIds[0]} />
        </div>
        <PhotoCredit credit={spot.imageCredit} className="mt-2 text-right" />
      </div>

      <div className="container mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <PrefectureTag id={spot.prefectureId} />
            {spot.categoryIds.map((c) => (
              <Badge key={c} variant="secondary" className="font-normal">
                {CATEGORY_MAP[c].label}
              </Badge>
            ))}
          </div>
          <p className="mt-4 text-xs tracking-wider text-muted-foreground">{spot.nameKana}</p>
          <h1 className="mt-1 text-3xl font-bold md:text-4xl">{spot.name}</h1>
          <p className="mt-4 font-serif text-lg text-primary md:text-xl">{spot.summary}</p>
          {spot.specialty && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/5 px-3 py-2 text-sm">
              <span className="text-muted-foreground">名物・おすすめ</span>
              <span className="font-bold">{spot.specialty}</span>
            </p>
          )}
          <p className="mt-6 leading-loose text-foreground/85">{spot.description}</p>

          <h2 className="mt-10 text-xl font-bold">見どころ</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {spot.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 rounded-md border bg-card p-3 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {h}
              </li>
            ))}
          </ul>
        </div>

        {/* サイド情報 */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border bg-card p-5">
            <h2 className="mb-4 font-serif text-base font-bold">基本情報</h2>
            <dl className="space-y-4 text-sm">
              {infoRows.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-3">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <dt className="text-xs text-muted-foreground">{label}</dt>
                    <dd className="mt-0.5">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            <div className="mt-5 grid gap-2">
              <Button asChild className="w-full">
                <Link to={`/?spot=${spot.id}`}>
                  <MapPinned /> 地図で行き方・距離を調べる
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                  Googleマップで開く <ExternalLink />
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-accent/30 bg-accent/5 p-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="flex items-center gap-1.5 font-serif text-base font-bold">
                <Lightbulb className="h-4 w-4 text-accent" />
                混雑をずらすヒント
              </h2>
              <CrowdIndicator level={spot.crowdLevel} />
            </div>
            <p className="mt-3 text-sm leading-relaxed">{spot.crowdTip}</p>
          </div>
        </aside>
      </div>

      {routes.length > 0 && (
        <section className="container mt-16">
          <SectionHeading en="Routes" title="このスポットを巡るルート" />
          <div className="grid gap-6 lg:grid-cols-2">
            {routes.map((r) => (
              <RouteCard key={r.id} route={r} />
            ))}
          </div>
        </section>
      )}

      <section className="container mt-16">
        <SectionHeading
          en="Nearby"
          title="あわせて巡りたい、近くのスポット"
          description="ここから足をのばせる場所。混雑する時間帯の過ごし方にもどうぞ。"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map((s) => (
            <SpotCard key={s.id} spot={s} />
          ))}
        </div>
      </section>
    </article>
  );
}
