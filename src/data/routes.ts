import type { TourRoute } from "@/types";

/**
 * 周遊ルートのモックデータ。Supabase 接続後は `routes` / `route_stops` テーブルに移行します。
 * 有名スポット（hub）と周辺スポット（nearby）を必ず組み合わせるのがこのサイトの方針です。
 */
export const ROUTES: TourRoute[] = [
  {
    id: "mitoyo-sunset",
    title: "父母ヶ浜の夕景まで、三豊の一日",
    subtitle: "夕方までの時間を、半島の山と港町で",
    prefectureIds: ["kagawa"],
    duration: "day",
    transport: "car",
    summary:
      "夕景の時間に人が集中する父母ヶ浜。昼間は紫雲出山の展望と仁尾の路地歩きでゆっくり過ごし、潮と日没のタイミングに合わせて浜へ向かいます。",
    stops: [
      { spotId: "shiudeyama", order: 1, role: "nearby", stayMinutes: 60, note: "午前の澄んだ空気の中で多島美を。", moveToNext: { mode: "car", minutes: 25 } },
      { spotId: "nio-town", order: 2, role: "nearby", stayMinutes: 120, note: "古民家カフェでランチと路地散策。", moveToNext: { mode: "car", minutes: 5 } },
      { spotId: "chichibugahama", order: 3, role: "hub", stayMinutes: 90, note: "日没の1時間前を目安に到着。", moveToNext: null },
    ],
    tips: ["潮見表で「干潮」と「日没」の時刻が近い日を選びましょう。", "風のない日ほど水鏡がきれいに映ります。"],
    imageUrl: null,
  },
  {
    id: "konpira-monzen",
    title: "朝のこんぴら参りと、芝居小屋",
    subtitle: "石段を早朝に上り、門前町で一息",
    prefectureIds: ["kagawa"],
    duration: "half-day",
    transport: "walk",
    summary:
      "参拝客が増える前の朝に御本宮へ。下山後は日本最古の芝居小屋・金丸座で江戸の芝居文化に触れ、門前町でうどんを味わう半日コースです。",
    stops: [
      { spotId: "konpira", order: 1, role: "hub", stayMinutes: 150, note: "8時台の参拝がおすすめ。", moveToNext: { mode: "walk", minutes: 5 } },
      { spotId: "kanamaruza", order: 2, role: "nearby", stayMinutes: 45, note: "奈落や回り舞台の仕掛けを見学。", moveToNext: null },
    ],
    tips: ["石段は滑りにくい靴で。", "時間があれば栗林公園（高松）まで足をのばしても。"],
    imageUrl: null,
  },
  {
    id: "naruto-ai",
    title: "鳴門の渦と、阿波藍の手しごと",
    subtitle: "自然の力と、人の技にふれる",
    prefectureIds: ["tokushima"],
    duration: "day",
    transport: "car",
    summary:
      "潮見表に合わせて渦潮を見たあと、陶板名画の美術館へ。帰り道に藍の館で藍染めを体験し、徳島が育んだ藍の文化を持ち帰ります。",
    stops: [
      { spotId: "naruto-whirlpools", order: 1, role: "hub", stayMinutes: 90, note: "見頃の時間は日によって変わります。", moveToNext: { mode: "car", minutes: 10 } },
      { spotId: "otsuka-museum", order: 2, role: "hub", stayMinutes: 180, note: "館内のカフェでランチも。", moveToNext: { mode: "car", minutes: 30 } },
      { spotId: "ai-no-yakata", order: 3, role: "nearby", stayMinutes: 90, note: "藍染め体験は1時間ほど。", moveToNext: null },
    ],
    tips: ["渦潮の見頃が午後の日は、美術館を先にしても。"],
    imageUrl: null,
  },
  {
    id: "iya-hikyo",
    title: "祖谷の秘境と、山あいの暮らし",
    subtitle: "かずら橋の先にある、集落の風景へ",
    prefectureIds: ["tokushima"],
    duration: "overnight",
    transport: "car",
    summary:
      "有名なかずら橋だけで帰ってしまうのはもったいない。大歩危峡の遊覧船から始まり、東祖谷の落合集落で山の暮らしの風景に出会い、古民家に泊まる1泊2日。帰りは脇町のうだつの町並みへ。",
    stops: [
      { spotId: "oboke-gorge", order: 1, role: "nearby", stayMinutes: 60, note: "午前の遊覧船でゆったりと。", moveToNext: { mode: "car", minutes: 5 } },
      { spotId: "michi-oboke", order: 2, role: "nearby", stayMinutes: 45, note: "妖怪屋敷を見学し、祖谷の情報収集を。", moveToNext: { mode: "car", minutes: 20 } },
      { spotId: "iya-kazurabashi", order: 3, role: "hub", stayMinutes: 60, note: "昼のピーク前に渡るのが◎。", moveToNext: { mode: "car", minutes: 30 } },
      { spotId: "ochiai-village", order: 4, role: "nearby", stayMinutes: 60, note: "展望所から全景を。古民家の宿に泊まる。", moveToNext: { mode: "car", minutes: 90 } },
      { spotId: "wakimachi-udatsu", order: 5, role: "nearby", stayMinutes: 60, note: "2日目、帰り道に町並み散策。", moveToNext: null },
    ],
    tips: ["山道は道幅が狭い区間があります。運転は余裕をもって。", "冬季は路面凍結に注意。"],
    imageUrl: null,
  },
  {
    id: "dogo-uchiko-ozu",
    title: "道後の朝湯から、内子・大洲の町並みへ",
    subtitle: "鉄道で巡る、愛媛の湯と商家の町",
    prefectureIds: ["ehime"],
    duration: "overnight",
    transport: "train",
    summary:
      "道後温泉に泊まり、朝湯と石手寺の散歩からスタート。特急で内子・大洲へ向かい、木蝋の町並みと肱川沿いの山荘を巡ります。帰りは下灘駅で夕暮れを。",
    stops: [
      { spotId: "dogo-onsen", order: 1, role: "hub", stayMinutes: 90, note: "朝6時の開館直後に。", moveToNext: { mode: "walk", minutes: 15 } },
      { spotId: "ishiteji", order: 2, role: "nearby", stayMinutes: 45, note: "朝の散歩がてらお参り。", moveToNext: { mode: "train", minutes: 60 } },
      { spotId: "uchiko", order: 3, role: "nearby", stayMinutes: 120, note: "内子座と和ろうそくの実演を。", moveToNext: { mode: "train", minutes: 15 } },
      { spotId: "garyu-sanso", order: 4, role: "nearby", stayMinutes: 60, note: "城下町散策とあわせて。", moveToNext: { mode: "train", minutes: 40 } },
      { spotId: "shimonada-station", order: 5, role: "hub", stayMinutes: 45, note: "列車の時刻を事前に確認。", moveToNext: null },
    ],
    tips: ["下灘駅は本数が少ないため、時刻表から逆算して計画を。"],
    imageUrl: null,
  },
  {
    id: "kochi-city-sunday",
    title: "日曜市で朝ごはん、龍馬と絵金の土佐",
    subtitle: "市場の朝から、太平洋沿いの町へ",
    prefectureIds: ["kochi"],
    duration: "day",
    transport: "car",
    summary:
      "日曜市で食べ歩きの朝ごはん、そのまま高知城へ。午後は桂浜で龍馬に会い、混み合う時間を避けて香南市赤岡の絵金蔵へ。土佐の芸能と暮らしにふれる一日です。",
    stops: [
      { spotId: "kochi-sunday-market", order: 1, role: "nearby", stayMinutes: 90, note: "8時ごろから歩き始める。", moveToNext: { mode: "walk", minutes: 5 } },
      { spotId: "kochi-castle", order: 2, role: "hub", stayMinutes: 90, note: "追手門から天守、本丸御殿へ。", moveToNext: { mode: "walk", minutes: 5 } },
      { spotId: "hirome-ichiba", order: 3, role: "nearby", stayMinutes: 60, note: "かつおのたたきで早めのランチ。", moveToNext: { mode: "car", minutes: 30 } },
      { spotId: "katsurahama", order: 4, role: "hub", stayMinutes: 90, note: "午後遅めは比較的落ち着きます。", moveToNext: { mode: "car", minutes: 30 } },
      { spotId: "ekin-gura", order: 5, role: "nearby", stayMinutes: 60, note: "芝居絵屏風の迫力に圧倒される。", moveToNext: null },
    ],
    tips: ["日曜市は日曜日のみ。ほかの曜日は「ひろめ市場」を起点に。"],
    imageUrl: null,
  },
  {
    id: "takamatsu-island",
    title: "庭園と鬼ヶ島、高松から気軽な島旅",
    subtitle: "朝の栗林公園から、フェリーで20分の島へ",
    prefectureIds: ["kagawa"],
    duration: "day",
    transport: "ferry",
    summary:
      "開園直後の静かな栗林公園で朝の庭園を味わい、高松港からフェリーで女木島へ。直島ほど混み合わない島で、洞窟探検と石垣の集落、アート作品を巡ります。",
    stops: [
      { spotId: "ritsurin", order: 1, role: "hub", stayMinutes: 90, note: "掬月亭でお抹茶を。", moveToNext: { mode: "bus", minutes: 20 } },
      { spotId: "megijima", order: 2, role: "nearby", stayMinutes: 180, note: "島内はバスで洞窟へ。", moveToNext: null },
    ],
    tips: ["フェリーは1〜2時間に1本程度。帰りの便を必ず確認しましょう。"],
    imageUrl: null,
  },
];
