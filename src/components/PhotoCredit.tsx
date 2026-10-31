import { cn } from "@/lib/utils";
import type { ImageCredit } from "@/types";

/** 写真の出典表記（撮影者・ライセンス・Wikimedia Commons へのリンク） */
export function PhotoCredit({ credit, className }: { credit: ImageCredit | null; className?: string }) {
  if (!credit) return null;
  return (
    <p className={cn("text-[11px] leading-snug text-muted-foreground", className)}>
      写真：{credit.author}（{credit.license}）／{" "}
      <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-primary">
        Wikimedia Commons
      </a>
      {credit.note && <span className="block">※{credit.note}</span>}
    </p>
  );
}
