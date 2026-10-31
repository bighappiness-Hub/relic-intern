import { Info, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { SpotCard, SpotCardSkeleton } from "@/components/SpotCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, CATEGORY_MAP, PREFECTURES, PREFECTURE_MAP, PREFECTURE_STYLE } from "@/data/master";
import { useAsync } from "@/hooks/use-async";
import { getSpots } from "@/lib/api";
import { cn, sessionShuffle } from "@/lib/utils";
import type { CategoryId, PrefectureId } from "@/types";

function FilterChip({ active, onClick, children, activeClass }: { active: boolean; onClick: () => void; children: React.ReactNode; activeClass?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        active ? cn("border-transparent text-white", activeClass ?? "bg-primary") : "bg-card hover:border-primary hover:text-primary",
      )}
    >
      {children}
    </button>
  );
}

export function SpotsPage() {
  const [params, setParams] = useSearchParams();
  const prefectureId = (params.get("pref") as PrefectureId) || undefined;
  const categoryId = (params.get("category") as CategoryId) || undefined;
  const keyword = params.get("q") ?? "";
  const excludeCrowded = params.get("quiet") === "1";

  const [input, setInput] = useState(keyword);
  useEffect(() => setInput(keyword), [keyword]);

  const { data, loading } = useAsync(
    () => getSpots({ prefectureId, categoryId, keyword, excludeCrowded }).then(sessionShuffle),
    [prefectureId, categoryId, keyword, excludeCrowded],
  );

  const update = (key: string, value?: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const hasFilter = Boolean(prefectureId || categoryId || keyword || excludeCrowded);

  return (
    <div className="container py-10 md:py-14">
      <header className="mb-8">
        <p className="mb-2 text-xs font-medium tracking-[0.3em] text-accent">SPOTS</p>
        <h1 className="text-3xl font-bold md:text-4xl">スポットを探す</h1>
        <p className="mt-3 flex items-start gap-1.5 text-sm text-muted-foreground">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          人気順・ランキングは設けていません。表示順はランダムで、すべてのスポットを同じ扱いで紹介しています。
        </p>
      </header>

      {/* 検索・フィルター */}
      <div className="space-y-4 rounded-lg border bg-card p-4 md:p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            update("q", input.trim() || undefined);
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="スポット名・地名・キーワード" className="pl-9" aria-label="キーワード" />
          </div>
          <Button type="submit">検索</Button>
        </form>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">エリア</p>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
            <FilterChip active={!prefectureId} onClick={() => update("pref")}>
              四国全域
            </FilterChip>
            {PREFECTURES.map((p) => (
              <FilterChip key={p.id} active={prefectureId === p.id} onClick={() => update("pref", p.id)} activeClass={PREFECTURE_STYLE[p.id].bg}>
                {p.name}
              </FilterChip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">カテゴリ</p>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
            <FilterChip active={!categoryId} onClick={() => update("category")}>
              すべて
            </FilterChip>
            {CATEGORIES.map((c) => (
              <FilterChip key={c.id} active={categoryId === c.id} onClick={() => update("category", c.id)}>
                {c.label}
              </FilterChip>
            ))}
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={excludeCrowded}
            onChange={(e) => update("quiet", e.target.checked ? "1" : undefined)}
            className="h-4 w-4 accent-[hsl(var(--primary))]"
          />
          混みやすいスポットを除いて、ゆったり巡れる場所だけ表示
        </label>
      </div>

      {/* 結果 */}
      <div className="mb-5 mt-8 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm">
          {loading ? "検索中…" : <><span className="text-lg font-bold">{data?.length ?? 0}</span> 件のスポット</>}
        </p>
        {hasFilter && (
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {prefectureId && <span className="rounded-full bg-secondary px-2.5 py-1">{PREFECTURE_MAP[prefectureId]?.name}</span>}
            {categoryId && <span className="rounded-full bg-secondary px-2.5 py-1">{CATEGORY_MAP[categoryId]?.label}</span>}
            {keyword && <span className="rounded-full bg-secondary px-2.5 py-1">「{keyword}」</span>}
            {excludeCrowded && <span className="rounded-full bg-secondary px-2.5 py-1">ゆったり</span>}
            <Button variant="ghost" size="sm" onClick={() => setParams({}, { replace: true })}>
              <X /> 条件をクリア
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading || !data
          ? Array.from({ length: 6 }).map((_, i) => <SpotCardSkeleton key={i} />)
          : data.map((s) => <SpotCard key={s.id} spot={s} />)}
      </div>

      {!loading && data?.length === 0 && (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <p className="font-serif text-lg font-bold">条件に合うスポットが見つかりませんでした</p>
          <p className="mt-2 text-sm text-muted-foreground">キーワードやエリアを変えて、もう一度探してみてください。</p>
          <Button className="mt-6" variant="outline" onClick={() => setParams({}, { replace: true })}>
            条件をクリア
          </Button>
        </div>
      )}
    </div>
  );
}
