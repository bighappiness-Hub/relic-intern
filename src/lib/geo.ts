/** 地図・距離・経路まわりのユーティリティ */

export interface LatLng {
  lat: number;
  lng: number;
}

/** 2点間の直線距離（km）— ハーサイン公式 */
export function distanceKm(a: LatLng, b: LatLng) {
  const R = 6371;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function formatKm(km: number) {
  return km < 1 ? `${Math.round(km * 1000)}m` : `${km < 10 ? km.toFixed(1) : Math.round(km)}km`;
}

export interface DrivingRoute {
  km: number;
  minutes: number;
  /** [lat, lng] の配列（Leaflet の Polyline 用） */
  path: [number, number][];
}

/**
 * 車での道のりと所要時間を取得（OSRM のデモサーバーを利用）。
 * ※ デモサーバーはプロトタイプ用です。本番では Supabase Edge Functions 経由で
 *   商用の経路 API（Google Routes API など）を呼ぶ構成に置き換えてください。
 */
export async function fetchDrivingRoute(a: LatLng, b: LatLng, signal?: AbortSignal): Promise<DrivingRoute> {
  const url = `https://router.project-osrm.org/route/v1/driving/${a.lng},${a.lat};${b.lng},${b.lat}?overview=full&geometries=geojson`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`経路の取得に失敗しました (${res.status})`);
  const json = await res.json();
  const route = json.routes?.[0];
  if (!route) throw new Error("経路が見つかりませんでした");
  return {
    km: route.distance / 1000,
    minutes: Math.round(route.duration / 60),
    path: (route.geometry.coordinates as [number, number][]).map(([lng, lat]) => [lat, lng]),
  };
}

export type TravelMode = "driving" | "transit" | "walking";

export const TRAVEL_MODE_LABEL: Record<TravelMode, string> = {
  driving: "車",
  transit: "公共交通機関",
  walking: "徒歩",
};

/**
 * Google マップの経路検索 URL。
 * origin を省略すると、Google マップ側で現在地が出発地になります。
 */
export function googleDirectionsUrl(destination: LatLng, mode: TravelMode, origin?: LatLng | string) {
  const params = new URLSearchParams({ api: "1", destination: `${destination.lat},${destination.lng}`, travelmode: mode });
  if (origin) params.set("origin", typeof origin === "string" ? origin : `${origin.lat},${origin.lng}`);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}
