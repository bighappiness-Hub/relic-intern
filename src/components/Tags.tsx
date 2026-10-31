import { Users } from "lucide-react";

import { CROWD_LABEL, PREFECTURE_MAP, PREFECTURE_STYLE } from "@/data/master";
import { cn } from "@/lib/utils";
import type { CrowdLevel, PrefectureId } from "@/types";

export function PrefectureTag({ id, className }: { id: PrefectureId; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium text-white",
        PREFECTURE_STYLE[id].bg,
        className,
      )}
    >
      {PREFECTURE_MAP[id].shortName}
    </span>
  );
}

const CROWD_DOTS: Record<CrowdLevel, number> = { low: 1, medium: 2, high: 3 };

/** 混雑しやすさ：人気の序列ではなく「時間をずらす目安」として表示する */
export function CrowdIndicator({ level, className }: { level: CrowdLevel; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-xs text-muted-foreground", className)} title="混雑しやすさの目安">
      <Users className="h-3.5 w-3.5" />
      <span className="flex gap-0.5" aria-hidden>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn("h-1.5 w-3 rounded-full", i <= CROWD_DOTS[level] ? (level === "high" ? "bg-accent" : "bg-primary/70") : "bg-border")}
          />
        ))}
      </span>
      {CROWD_LABEL[level]}
    </span>
  );
}
