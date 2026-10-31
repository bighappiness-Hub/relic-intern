import { Building2, Landmark, Mountain, Palette, Soup, Store, Users, UtensilsCrossed, Waves, type LucideIcon } from "lucide-react";
import { useState } from "react";

import { PREFECTURE_STYLE } from "@/data/master";
import { cn } from "@/lib/utils";
import type { CategoryId, ImageCredit, PrefectureId } from "@/types";

const CATEGORY_ICON: Record<CategoryId, LucideIcon> = {
  nature: Mountain,
  history: Landmark,
  townscape: Building2,
  art: Palette,
  culture: Users,
  food: Soup,
  onsen: Waves,
  michinoeki: Store,
  gourmet: UtensilsCrossed,
};

interface Props {
  imageUrl: string | null;
  alt: string;
  prefectureId: PrefectureId;
  categoryId?: CategoryId;
  className?: string;
  showIcon?: boolean;
  /** 写真のクレジット。渡すと右下に撮影者・ライセンスを表示 */
  credit?: ImageCredit | null;
}

/**
 * スポット・ルートの画像。
 * imageUrl があれば画像を表示し、なければ（または読み込みに失敗したら）県カラー × 青海波模様のプレースホルダーを表示します。
 */
export function SpotImage({ imageUrl, alt, prefectureId, categoryId = "nature", className, showIcon = true, credit }: Props) {
  const [failed, setFailed] = useState(false);

  if (imageUrl && !failed) {
    return (
      <div className="relative h-full w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className={cn("h-full w-full object-cover", className)}
        />
        {credit && (
          <span className="pointer-events-none absolute bottom-0 right-0 max-w-full truncate rounded-tl bg-black/45 px-1.5 py-0.5 text-[10px] leading-tight text-white/90">
            © {credit.author} / {credit.license}
          </span>
        )}
      </div>
    );
  }

  const Icon = CATEGORY_ICON[categoryId];
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("relative flex h-full w-full items-center justify-center overflow-hidden", PREFECTURE_STYLE[prefectureId].bg, className)}
    >
      <div className="bg-seigaiha absolute inset-0 text-white/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
      {showIcon && <Icon className="relative h-10 w-10 text-white/70" strokeWidth={1.25} />}
    </div>
  );
}
