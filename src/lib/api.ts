/**
 * データアクセス層。
 * 画面は必ずこのファイルの関数経由でデータを取得します（コンポーネントから直接モックを import しない）。
 * Supabase 接続時は、各関数の中身を TODO のクエリに差し替えるだけで画面側の変更は不要です。
 */
import { ROUTES } from "@/data/routes";
import { SPOTS } from "@/data/spots";
import { distanceKm } from "@/lib/geo";
import type { PrefectureId, Spot, SpotFilter, TourRoute } from "@/types";

// モック用：通信を模した遅延（ローディング表示の確認用）
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export async function getSpots(filter: SpotFilter = {}): Promise<Spot[]> {
  // TODO(Supabase):
  // let q = supabase.from("spots").select("*");
  // if (filter.prefectureId) q = q.eq("prefecture_id", filter.prefectureId);
  // if (filter.categoryId) q = q.contains("category_ids", [filter.categoryId]);
  // if (filter.excludeCrowded) q = q.neq("crowd_level", "high");
  // if (filter.keyword) q = q.or(`name.ilike.%${kw}%,summary.ilike.%${kw}%,city.ilike.%${kw}%`);
  await delay();
  const kw = filter.keyword?.trim().toLowerCase();
  return SPOTS.filter((s) => {
    if (filter.prefectureId && s.prefectureId !== filter.prefectureId) return false;
    if (filter.categoryId && !s.categoryIds.includes(filter.categoryId)) return false;
    if (filter.excludeCrowded && s.crowdLevel === "high") return false;
    if (kw) {
      const haystack = [s.name, s.nameKana, s.city, s.summary, ...s.highlights].join(" ").toLowerCase();
      if (!haystack.includes(kw)) return false;
    }
    return true;
  });
}

export async function getSpot(id: string): Promise<Spot | null> {
  // TODO(Supabase): supabase.from("spots").select("*").eq("id", id).maybeSingle()
  await delay();
  return SPOTS.find((s) => s.id === id) ?? null;
}

export async function getSpotsByIds(ids: string[]): Promise<Spot[]> {
  // TODO(Supabase): supabase.from("spots").select("*").in("id", ids)
  await delay();
  return ids.map((id) => SPOTS.find((s) => s.id === id)).filter((s): s is Spot => Boolean(s));
}

/** 近くのスポット（Supabase では PostGIS か RPC 関数で距離計算する想定） */
export async function getNearbySpots(spot: Spot, limit = 3): Promise<Spot[]> {
  // TODO(Supabase): supabase.rpc("nearby_spots", { target_id: spot.id, max_count: limit })
  await delay();
  return SPOTS.filter((s) => s.id !== spot.id)
    .map((s) => ({ s, d: distanceKm(spot, s) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, limit)
    .map(({ s }) => s);
}

export async function getRoutes(prefectureId?: PrefectureId): Promise<TourRoute[]> {
  // TODO(Supabase): supabase.from("routes").select("*, route_stops(*)").order("order", { referencedTable: "route_stops" })
  await delay();
  return prefectureId ? ROUTES.filter((r) => r.prefectureIds.includes(prefectureId)) : ROUTES;
}

export async function getRoute(id: string): Promise<TourRoute | null> {
  // TODO(Supabase): supabase.from("routes").select("*, route_stops(*)").eq("id", id).maybeSingle()
  await delay();
  return ROUTES.find((r) => r.id === id) ?? null;
}

/** 指定スポットを含む周遊ルート */
export async function getRoutesBySpot(spotId: string): Promise<TourRoute[]> {
  // TODO(Supabase): route_stops から spot_id で絞り込み、routes を join
  await delay();
  return ROUTES.filter((r) => r.stops.some((st) => st.spotId === spotId));
}
