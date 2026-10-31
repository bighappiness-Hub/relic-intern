import { Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import { SpotImage } from "@/components/SpotImage";
import { CrowdIndicator, PrefectureTag } from "@/components/Tags";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_MAP } from "@/data/master";
import { formatMinutes } from "@/lib/utils";
import type { Spot } from "@/types";

/**
 * スポットカード。
 * 有名かどうかで大きさや装飾を変えず、すべて同じ扱いで表示するのがこのサイトの方針です。
 */
export function SpotCard({ spot }: { spot: Spot }) {
  return (
    <Link to={`/spots/${spot.id}`} className="group block h-full focus-visible:outline-none">
      <Card className="flex h-full flex-col overflow-hidden transition-all group-hover:-translate-y-0.5 group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <div className="relative aspect-[4/3] overflow-hidden">
          <SpotImage
            imageUrl={spot.imageUrl}
            alt={spot.name}
            prefectureId={spot.prefectureId}
            categoryId={spot.categoryIds[0]}
            credit={spot.imageCredit}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <PrefectureTag id={spot.prefectureId} className="absolute left-3 top-3 shadow-sm" />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {spot.city}
          </p>
          <h3 className="text-lg font-bold leading-snug group-hover:text-primary">{spot.name}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{spot.summary}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {spot.categoryIds.map((c) => (
              <Badge key={c} variant="secondary" className="font-normal">
                {CATEGORY_MAP[c].label}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between border-t pt-3">
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              目安 {formatMinutes(spot.stayMinutes)}
            </span>
            <CrowdIndicator level={spot.crowdLevel} />
          </div>
        </div>
      </Card>
    </Link>
  );
}

export function SpotCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="space-y-3 p-4">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
      </div>
    </Card>
  );
}
