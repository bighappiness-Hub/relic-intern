import { ArrowRight, CalendarDays, Navigation } from "lucide-react";
import { Link } from "react-router-dom";

import { SpotImage } from "@/components/SpotImage";
import { PrefectureTag } from "@/components/Tags";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DURATION_LABEL, TRANSPORT_LABEL } from "@/data/master";
import { SPOTS } from "@/data/spots";
import { cn } from "@/lib/utils";
import type { TourRoute } from "@/types";

// ルートの立ち寄り先名を表示するための簡易参照（Supabase 接続後は route_stops に spots を join して取得）
const spotName = (id: string) => SPOTS.find((s) => s.id === id)?.name ?? id;

export function RouteCard({ route, className }: { route: TourRoute; className?: string }) {
  const hubCount = route.stops.filter((s) => s.role === "hub").length;
  const nearbyCount = route.stops.length - hubCount;

  return (
    <Link to={`/routes/${route.id}`} className={cn("group block h-full focus-visible:outline-none", className)}>
      <Card className="flex h-full flex-col overflow-hidden transition-all group-hover:-translate-y-0.5 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring sm:flex-row lg:flex-col xl:flex-row">
        <div className="relative aspect-[16/9] shrink-0 sm:aspect-auto sm:w-2/5 lg:aspect-[16/9] lg:w-full xl:aspect-auto xl:w-2/5">
          <SpotImage imageUrl={route.imageUrl} alt={route.title} prefectureId={route.prefectureIds[0]} />
          <div className="absolute left-3 top-3 flex gap-1.5">
            {route.prefectureIds.map((p) => (
              <PrefectureTag key={p} id={p} />
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {DURATION_LABEL[route.duration]}
            </span>
            <span className="inline-flex items-center gap-1">
              <Navigation className="h-3.5 w-3.5" />
              主な移動：{TRANSPORT_LABEL[route.transport]}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold leading-snug group-hover:text-primary">{route.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{route.subtitle}</p>
          </div>
          {/* 立ち寄り先のミニ行程 */}
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
            {route.stops.map((stop, i) => (
              <li key={stop.spotId} className="inline-flex items-center gap-1.5">
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full",
                    stop.role === "hub" ? "bg-accent" : "border-2 border-primary bg-background",
                  )}
                />
                <span>{spotName(stop.spotId)}</span>
                {i < route.stops.length - 1 && <ArrowRight className="h-3 w-3 text-muted-foreground" />}
              </li>
            ))}
          </ol>
          <p className="mt-auto text-xs text-muted-foreground">
            起点スポット {hubCount}・周辺スポット {nearbyCount}
          </p>
        </div>
      </Card>
    </Link>
  );
}

export function RouteCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden sm:flex-row">
      <Skeleton className="aspect-[16/9] rounded-none sm:aspect-auto sm:h-48 sm:w-2/5" />
      <div className="flex-1 space-y-3 p-5">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </Card>
  );
}
