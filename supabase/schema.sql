-- 四国めぐり帖：Supabase スキーマ案
-- src/types/index.ts の型と対応しています（DB はスネークケース）。
-- Supabase ダッシュボードの SQL Editor に貼り付けて実行できます。

create table if not exists prefectures (
  id text primary key,                 -- 'tokushima' | 'kagawa' | 'ehime' | 'kochi'
  name text not null,
  short_name text not null,
  catchcopy text not null default '',
  description text not null default ''
);

create table if not exists spots (
  id text primary key,                 -- URL 用 slug
  name text not null,
  name_kana text not null default '',
  prefecture_id text not null references prefectures(id),
  city text not null default '',
  category_ids text[] not null default '{}',   -- nature / history / townscape / art / culture / food / onsen / michinoeki（道の駅） / gourmet（名物グルメ）
  summary text not null default '',
  description text not null default '',
  highlights text[] not null default '{}',
  access text not null default '',
  stay_minutes integer not null default 60,
  best_season text not null default '',
  crowd_level text not null default 'medium' check (crowd_level in ('high', 'medium', 'low')),
  crowd_tip text not null default '',
  lat double precision not null,
  lng double precision not null,
  image_url text,                      -- Storage バケット "spot-images" の公開 URL（現在は Wikimedia Commons の URL）
  image_credit jsonb,                  -- { "author", "license", "sourceUrl", "note"(任意：写真は料理のイメージです 等) }
  specialty text,                      -- 名物・おすすめ（道の駅・飲食店向け）
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists spots_prefecture_idx on spots (prefecture_id);
create index if not exists spots_category_idx on spots using gin (category_ids);

create table if not exists routes (
  id text primary key,
  title text not null,
  subtitle text not null default '',
  prefecture_ids text[] not null default '{}',
  duration text not null check (duration in ('half-day', 'day', 'overnight')),
  transport text not null check (transport in ('car', 'train', 'bus', 'walk', 'ferry')),
  summary text not null default '',
  tips text[] not null default '{}',
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists route_stops (
  route_id text not null references routes(id) on delete cascade,
  spot_id text not null references spots(id),
  "order" integer not null,
  role text not null check (role in ('hub', 'nearby')),
  stay_minutes integer not null default 60,
  note text not null default '',
  move_mode text check (move_mode in ('car', 'train', 'bus', 'walk', 'ferry')),
  move_minutes integer,
  primary key (route_id, "order")
);

create index if not exists route_stops_spot_idx on route_stops (spot_id);

-- 閲覧は誰でも可、書き込みは管理者のみ（将来 Supabase Auth のロールで制御）
alter table prefectures enable row level security;
alter table spots enable row level security;
alter table routes enable row level security;
alter table route_stops enable row level security;

create policy "public read prefectures" on prefectures for select using (true);
create policy "public read spots" on spots for select using (true);
create policy "public read routes" on routes for select using (true);
create policy "public read route_stops" on route_stops for select using (true);

-- 近くのスポットを返す RPC（getNearbySpots 用）
create or replace function nearby_spots(target_id text, max_count int default 3)
returns setof spots
language sql stable as $$
  select s.* from spots s, spots t
  where t.id = target_id and s.id <> t.id
  order by (s.lat - t.lat)^2 + ((s.lng - t.lng) * cos(radians(t.lat)))^2
  limit max_count;
$$;
