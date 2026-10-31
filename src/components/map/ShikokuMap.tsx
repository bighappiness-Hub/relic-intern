import type { Feature, FeatureCollection, MultiPolygon } from "geojson";
import L from "leaflet";
import { useEffect, useMemo } from "react";
import { GeoJSON, MapContainer, Marker, Polyline, TileLayer, Tooltip, useMap, ZoomControl } from "react-leaflet";

import shikokuGeo from "@/data/shikoku.geo.json";
import { MAP_COLORS, PREFECTURES, SPOT_KIND_MAP, spotKind } from "@/data/master";
import type { PrefectureId, Spot } from "@/types";

const GEO = shikokuGeo as FeatureCollection<MultiPolygon, { id: PrefectureId }>;

/** 四国全体の表示範囲 */
const SHIKOKU_BOUNDS = L.latLngBounds([32.7, 132.0], [34.55, 134.82]);

/** 県名ラベルの位置 */
const LABEL_POS: Record<PrefectureId, [number, number]> = {
  tokushima: [33.93, 134.3],
  kagawa: [34.22, 133.95],
  ehime: [33.62, 132.78],
  kochi: [33.4, 133.25],
};

const prefColor = (id: PrefectureId) => MAP_COLORS[id];

/** 地図の余白（パネルに隠れないよう fitBounds に渡す） */
export interface MapPadding {
  topLeft: [number, number];
  bottomRight: [number, number];
}

interface Props {
  prefectureId?: PrefectureId;
  spots: Spot[];
  selected?: Spot;
  compare?: Spot;
  routePath?: [number, number][] | null;
  padding: MapPadding;
  onSelectPrefecture: (id: PrefectureId) => void;
  onSelectSpot: (spot: Spot) => void;
}

function pinIcon(spot: Spot, state: "default" | "selected" | "compare") {
  const kind = spotKind(spot);
  const glyph = state === "compare" ? "B" : SPOT_KIND_MAP[kind].glyph;
  const size = state === "default" ? (glyph ? 26 : 22) : 34;
  return L.divIcon({
    className: "",
    html: `<div class="spot-pin spot-pin--${state} spot-pin--${kind}" style="--pin:${prefColor(spot.prefectureId)}">${glyph}</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

/** 県・スポットの選択に合わせて表示範囲を動かす */
function ViewController({ prefectureId, selected, compare, padding }: Pick<Props, "prefectureId" | "selected" | "compare" | "padding">) {
  const map = useMap();
  const opts = useMemo(
    () => ({ paddingTopLeft: L.point(padding.topLeft), paddingBottomRight: L.point(padding.bottomRight), animate: true }),
    [padding.topLeft, padding.bottomRight],
  );

  useEffect(() => {
    map.invalidateSize();
    // サイズ未確定のまま動かすと NaN になるため、表示前は何もしない
    if (map.getSize().x === 0) return;
    if (selected && compare) {
      map.fitBounds(L.latLngBounds([selected.lat, selected.lng], [compare.lat, compare.lng]), { ...opts, maxZoom: 12 });
    } else if (selected) {
      // パネルに隠れていない領域の中央にポイントが来るよう、中心をずらして表示
      const zoom = Math.min(Math.max(map.getZoom(), 11), 14);
      const size = map.getSize();
      const visibleCenter = L.point(
        (padding.topLeft[0] + size.x - padding.bottomRight[0]) / 2,
        (padding.topLeft[1] + size.y - padding.bottomRight[1]) / 2,
      );
      const offset = size.divideBy(2).subtract(visibleCenter);
      const center = map.unproject(map.project([selected.lat, selected.lng], zoom).add(offset), zoom);
      map.setView(center, zoom, { animate: true });
    } else if (prefectureId) {
      const feature = GEO.features.find((f) => f.properties.id === prefectureId);
      if (feature) map.fitBounds(L.geoJSON(feature).getBounds(), opts);
    } else {
      map.fitBounds(SHIKOKU_BOUNDS, opts);
    }
  }, [map, prefectureId, selected, compare, opts, padding]);

  return null;
}

export function ShikokuMap({ prefectureId, spots, selected, compare, routePath, padding, onSelectPrefecture, onSelectSpot }: Props) {
  const style = (feature?: Feature): L.PathOptions => {
    const id = (feature?.properties as { id: PrefectureId }).id;
    const color = prefColor(id);
    if (!prefectureId) return { color: "#fff", weight: 2, fillColor: color, fillOpacity: 0.55 };
    if (id === prefectureId) return { color, weight: 3, fillColor: color, fillOpacity: 0.06 };
    return { color: "#fff", weight: 1, fillColor: "#64748b", fillOpacity: 0.25 };
  };

  return (
    <MapContainer bounds={SHIKOKU_BOUNDS} zoomSnap={0.25} className="h-full w-full" zoomControl={false} attributionControl>
      <ZoomControl position="bottomright" />
      <TileLayer
        url="https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"
        attribution='<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noreferrer">地理院タイル</a> ｜ 行政界：地球地図日本 ｜ 経路：OSRM'
        maxZoom={18}
      />

      <GeoJSON
        key={prefectureId ?? "all"}
        data={GEO}
        style={style}
        onEachFeature={(feature, layer) => {
          const id = (feature.properties as { id: PrefectureId }).id;
          layer.on({
            click: () => onSelectPrefecture(id),
            mouseover: (e) => id !== prefectureId && (e.target as L.Path).setStyle({ fillOpacity: prefectureId ? 0.4 : 0.75 }),
            mouseout: (e) => (e.target as L.Path).setStyle(style(feature)),
          });
        }}
      />

      {/* 四国全体表示のときだけ県名ラベル */}
      {!prefectureId &&
        PREFECTURES.map((p) => (
          <Marker
            key={p.id}
            position={LABEL_POS[p.id]}
            interactive={false}
            icon={L.divIcon({ className: "", html: `<div class="pref-label">${p.shortName}</div>`, iconSize: [80, 32], iconAnchor: [40, 16] })}
          />
        ))}

      {routePath && <Polyline positions={routePath} pathOptions={{ color: MAP_COLORS.primary, weight: 5, opacity: 0.8 }} />}
      {selected && compare && (
        <Polyline
          positions={[
            [selected.lat, selected.lng],
            [compare.lat, compare.lng],
          ]}
          pathOptions={{ color: MAP_COLORS.accent, weight: 2, dashArray: "6 8" }}
        />
      )}

      {spots.map((spot) => {
        const state = spot.id === selected?.id ? "selected" : spot.id === compare?.id ? "compare" : "default";
        return (
          <Marker
            key={`${spot.id}-${state}`}
            position={[spot.lat, spot.lng]}
            icon={pinIcon(spot, state)}
            zIndexOffset={state === "default" ? 0 : 1000}
            eventHandlers={{ click: () => onSelectSpot(spot) }}
            title={spot.name}
          >
            <Tooltip direction="top" offset={[0, state === "default" ? -12 : -18]} permanent={state !== "default"} className="spot-tooltip">
              {spot.name}
            </Tooltip>
          </Marker>
        );
      })}

      <ViewController prefectureId={prefectureId} selected={selected} compare={compare} padding={padding} />
    </MapContainer>
  );
}
