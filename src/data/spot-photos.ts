import type { ImageCredit } from "@/types";

/**
 * スポットの代表写真（Wikimedia Commons）。
 * 各写真のライセンス（CC BY-SA など）に従い、表示時に撮影者・ライセンス・出典を明記しています。
 * Supabase 接続後は spots.image_url / image_credit カラム（または Storage）に移行します。
 */
export const SPOT_PHOTOS: Record<string, { imageUrl: string; imageCredit: ImageCredit }> = {
  "naruto-whirlpools": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Naruto_Whirlpools_taken_4-21-2008.jpg/960px-Naruto_Whirlpools_taken_4-21-2008.jpg",
    imageCredit: { author: "Hellbuny", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Naruto_Whirlpools_taken_4-21-2008.jpg" },
  },
  "otsuka-museum": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/The_Otsuka_Museum_of_Art20s3203-B-T.jpg/960px-The_Otsuka_Museum_of_Art20s3203-B-T.jpg",
    imageCredit: { author: "EMS-62", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:The_Otsuka_Museum_of_Art20s3203-B-T.jpg" },
  },
  "ai-no-yakata": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Aizumi_Ai_no_Yakata.jpg",
    imageCredit: { author: "Tamago915", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Aizumi_Ai_no_Yakata.jpg" },
  },
  "iya-kazurabashi": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Iya_Valley_a.jpeg/960px-Iya_Valley_a.jpeg",
    imageCredit: { author: "Yamato", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Iya_Valley_a.jpeg" },
  },
  "ochiai-village": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Higashi-Iya_Ochiai_201303-1.JPG/960px-Higashi-Iya_Ochiai_201303-1.JPG",
    imageCredit: { author: "At by At", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Higashi-Iya_Ochiai_201303-1.JPG" },
  },
  "oboke-gorge": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Tokushima_Miyoshi_Yoshino_River_Of_Oboke_Gorge_1.JPG/960px-Tokushima_Miyoshi_Yoshino_River_Of_Oboke_Gorge_1.JPG",
    imageCredit: { author: "京浜にけ", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tokushima_Miyoshi_Yoshino_River_Of_Oboke_Gorge_1.JPG" },
  },
  "wakimachi-udatsu": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Wakimachi_Minami-machi_in_Mima_Tokushima_pref01.jpg/960px-Wakimachi_Minami-machi_in_Mima_Tokushima_pref01.jpg",
    imageCredit: { author: "＋－", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Wakimachi_Minami-machi_in_Mima_Tokushima_pref01.jpg" },
  },
  "konpira": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Kotohira-gu01s.jpg/960px-Kotohira-gu01s.jpg",
    imageCredit: { author: "Toto-tarou", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Kotohira-gu01s.jpg" },
  },
  "kanamaruza": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/85/KyuKonpiraooshibai.jpg",
    imageCredit: { author: "Toto-tarou", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:KyuKonpiraooshibai.jpg" },
  },
  "chichibugahama": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Titibugahama_01.jpg/960px-Titibugahama_01.jpg",
    imageCredit: { author: "Dokudami", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Titibugahama_01.jpg" },
  },
  "shiudeyama": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Siudeyama01.jpg/960px-Siudeyama01.jpg",
    imageCredit: { author: "Dokudami", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Siudeyama01.jpg" },
  },
  "nio-town": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/%E4%B8%89%E8%B1%8A%E5%B8%82%E3%81%AE%E8%A6%9A%E5%9F%8E%E9%99%A2.jpg/960px-%E4%B8%89%E8%B1%8A%E5%B8%82%E3%81%AE%E8%A6%9A%E5%9F%8E%E9%99%A2.jpg",
    imageCredit: { author: "キアラア", license: "CC0", sourceUrl: "https://commons.wikimedia.org/wiki/File:%E4%B8%89%E8%B1%8A%E5%B8%82%E3%81%AE%E8%A6%9A%E5%9F%8E%E9%99%A2.jpg" },
  },
  "ritsurin": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Ritsurin.JPG/960px-Ritsurin.JPG",
    imageCredit: { author: "Leela Soden", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ritsurin.JPG" },
  },
  "megijima": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/%E3%82%B5%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%88%E9%AB%99%E6%9D%BE%E3%82%88%E3%82%8A%E6%9C%9B%E3%82%80.JPG/960px-%E3%82%B5%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%88%E9%AB%99%E6%9D%BE%E3%82%88%E3%82%8A%E6%9C%9B%E3%82%80.JPG",
    imageCredit: { author: "屋嶋の仙人", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:%E3%82%B5%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%88%E9%AB%99%E6%9D%BE%E3%82%88%E3%82%8A%E6%9C%9B%E3%82%80.JPG" },
  },
  "dogo-onsen": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/D%C5%8Dgo_Onsen.jpg/960px-D%C5%8Dgo_Onsen.jpg",
    imageCredit: { author: "Arnaud Malon", license: "CC BY 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:D%C5%8Dgo_Onsen.jpg" },
  },
  "ishiteji": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Isiteji20220325_1.jpg/960px-Isiteji20220325_1.jpg",
    imageCredit: { author: "Dokudami", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Isiteji20220325_1.jpg" },
  },
  "matsuyama-castle": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/%E6%9D%BE%E5%B1%B1%E5%9F%8E%E5%A4%A9%E5%AE%88_%282372904566%29.jpg/960px-%E6%9D%BE%E5%B1%B1%E5%9F%8E%E5%A4%A9%E5%AE%88_%282372904566%29.jpg",
    imageCredit: { author: "Yamaguchi Yoshiaki from Japan", license: "CC BY-SA 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:%E6%9D%BE%E5%B1%B1%E5%9F%8E%E5%A4%A9%E5%AE%88_(2372904566).jpg" },
  },
  "uchiko": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Uchiko-za_ac_%281%29.jpg/960px-Uchiko-za_ac_%281%29.jpg",
    imageCredit: { author: "Asturio Cantabrio", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Uchiko-za_ac_(1).jpg" },
  },
  "garyu-sanso": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Ozu_Garyusanso_Garyuin_1.jpg/960px-Ozu_Garyusanso_Garyuin_1.jpg",
    imageCredit: { author: "京浜にけ", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ozu_Garyusanso_Garyuin_1.jpg" },
  },
  "shimonada-station": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Shimonada_Station_201507%281%29.JPG/960px-Shimonada_Station_201507%281%29.JPG",
    imageCredit: { author: "Sunport1216", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Shimonada_Station_201507(1).JPG" },
  },
  "oyamazumi-shrine": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ohyamazumi_Shrine_Haiden.JPG/960px-Ohyamazumi_Shrine_Haiden.JPG",
    imageCredit: { author: "Mika-wa-Taro", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Ohyamazumi_Shrine_Haiden.JPG" },
  },
  "katsurahama": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Kochi_Katsurahama_Daytime_2.JPG/960px-Kochi_Katsurahama_Daytime_2.JPG",
    imageCredit: { author: "京浜にけ", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Kochi_Katsurahama_Daytime_2.JPG" },
  },
  "kochi-sunday-market": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Crowds_at_the_Kochi_Sunday_Market%2C_March_2014.jpg/960px-Crowds_at_the_Kochi_Sunday_Market%2C_March_2014.jpg",
    imageCredit: { author: "NevinThompson", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Crowds_at_the_Kochi_Sunday_Market,_March_2014.jpg" },
  },
  "kochi-castle": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Kochi_Castle%2C_Outemon-3.jpg/960px-Kochi_Castle%2C_Outemon-3.jpg",
    imageCredit: { author: "Saigen Jiro", license: "CC0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Kochi_Castle,_Outemon-3.jpg" },
  },
  "ekin-gura": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Kochi_Konan_Ekingura_1.jpg/960px-Kochi_Konan_Ekingura_1.jpg",
    imageCredit: { author: "京浜にけ", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Kochi_Konan_Ekingura_1.jpg" },
  },
  "niyodo-nikobuchi": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Nikobuti03.jpg/960px-Nikobuti03.jpg",
    imageCredit: { author: "Dokudami", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Nikobuti03.jpg" },
  },
  "shimanto-chinkabashi": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Shimanto_sada_chinkabashi.jpg/960px-Shimanto_sada_chinkabashi.jpg",
    imageCredit: { author: "四万十人", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Shimanto_sada_chinkabashi.jpg" },
  },
  "muroto-cape": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Murotomisaki20220510_4.jpg/960px-Murotomisaki20220510_4.jpg",
    imageCredit: { author: "Dokudami", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Murotomisaki20220510_4.jpg" },
  },
  // ───── 道の駅・グルメ ─────
  "michi-oboke": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Michinoeki_%C5%8Cboke_20211128_01.jpg/960px-Michinoeki_%C5%8Cboke_20211128_01.jpg",
    imageCredit: { author: "先従隗始", license: "CC0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Michinoeki_%C5%8Cboke_20211128_01.jpg" },
  },
  "michi-kurukuru-naruto": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Kurukurunaruto_20231031_1.jpg/960px-Kurukurunaruto_20231031_1.jpg",
    imageCredit: { author: "Araiyasushige", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Kurukurunaruto_20231031_1.jpg" },
  },
  "michi-gempei-mure": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/%E9%81%93%E3%81%AE%E9%A7%85_%E6%BA%90%E5%B9%B3%E3%81%AE%E9%87%8C%E3%82%80%E3%82%8C_-_panoramio.jpg/960px-%E9%81%93%E3%81%AE%E9%A7%85_%E6%BA%90%E5%B9%B3%E3%81%AE%E9%87%8C%E3%82%80%E3%82%8C_-_panoramio.jpg",
    imageCredit: { author: "米田賢一", license: "CC BY 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:%E9%81%93%E3%81%AE%E9%A7%85_%E6%BA%90%E5%B9%B3%E3%81%AE%E9%87%8C%E3%82%80%E3%82%8C_-_panoramio.jpg" },
  },
  "michi-olive-park": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Shodoshima_Olive_Park_Shodo_Island_Japan21bs3.jpg/960px-Shodoshima_Olive_Park_Shodo_Island_Japan21bs3.jpg",
    imageCredit: { author: "663highland", license: "CC BY 2.5", sourceUrl: "https://commons.wikimedia.org/wiki/File:Shodoshima_Olive_Park_Shodo_Island_Japan21bs3.jpg" },
  },
  "michi-karari": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/%E9%81%93%E3%81%AE%E9%A7%85%E5%86%85%E5%AD%90%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5%E3%83%91%E3%83%BC%E3%82%AF%E3%81%8B%E3%82%89%E3%82%8A_Jan_3%2C_2013_%281%29.jpg/960px-%E9%81%93%E3%81%AE%E9%A7%85%E5%86%85%E5%AD%90%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5%E3%83%91%E3%83%BC%E3%82%AF%E3%81%8B%E3%82%89%E3%82%8A_Jan_3%2C_2013_%281%29.jpg",
    imageCredit: { author: "Keiichi Yasu", license: "CC BY-SA 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:%E9%81%93%E3%81%AE%E9%A7%85%E5%86%85%E5%AD%90%E3%83%95%E3%83%AC%E3%83%83%E3%82%B7%E3%83%A5%E3%83%91%E3%83%BC%E3%82%AF%E3%81%8B%E3%82%89%E3%82%8A_Jan_3,_2013_(1).jpg" },
  },
  "michi-tatara": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Tatara_Bridge_from_Roadside_Station_%22Imabari_City_Tatara_Shimanami_Park%22_4.jpg/960px-Tatara_Bridge_from_Roadside_Station_%22Imabari_City_Tatara_Shimanami_Park%22_4.jpg",
    imageCredit: { author: "そらみみ", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Tatara_Bridge_from_Roadside_Station_%22Imabari_City_Tatara_Shimanami_Park%22_4.jpg" },
  },
  "michi-futami": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/%E9%81%93%E3%81%AE%E9%A7%85%E3%81%B5%E3%81%9F%E3%81%BF.jpg/960px-%E9%81%93%E3%81%AE%E9%A7%85%E3%81%B5%E3%81%9F%E3%81%BF.jpg",
    imageCredit: { author: "Bakkai", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:%E9%81%93%E3%81%AE%E9%A7%85%E3%81%B5%E3%81%9F%E3%81%BF.jpg" },
  },
  "michi-towa": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Roadside_Station_Toowa.jpg/960px-Roadside_Station_Toowa.jpg",
    imageCredit: { author: "As6022014", license: "Public domain", sourceUrl: "https://commons.wikimedia.org/wiki/File:Roadside_Station_Toowa.jpg" },
  },
  "michi-kiramesse": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/R055-490.jpg/960px-R055-490.jpg",
    imageCredit: { author: "Puchi-masashi", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:R055-490.jpg" },
  },
  "ikkaku-marugame": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Honetsukidori_Ikkaku_-_Aug_5%2C_2012.jpg/960px-Honetsukidori_Ikkaku_-_Aug_5%2C_2012.jpg",
    imageCredit: { author: "shinji_w", license: "CC BY 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Honetsukidori_Ikkaku_-_Aug_5,_2012.jpg", note: "写真は骨付鳥のイメージです（別店舗）" },
  },
  "inotani": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/%E5%BE%B3%E5%B3%B6%E3%83%A9%E3%83%BC%E3%83%A1%E3%83%B3_%288213093116%29.jpg",
    imageCredit: { author: "ajari from Japan", license: "CC BY 2.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:%E5%BE%B3%E5%B3%B6%E3%83%A9%E3%83%BC%E3%83%A1%E3%83%B3_(8213093116).jpg", note: "写真は徳島ラーメンのイメージです" },
  },
  "kadoya-uwajima": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Uwajima_Taimeshi.jpg/960px-Uwajima_Taimeshi.jpg",
    imageCredit: { author: "Fred Cherrygarden", license: "CC BY-SA 4.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Uwajima_Taimeshi.jpg", note: "写真は宇和島鯛めしのイメージです" },
  },
  "hirome-ichiba": {
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Hirome-Ichiba%2CKochi-city%2CJapan.jpg/960px-Hirome-Ichiba%2CKochi-city%2CJapan.jpg",
    imageCredit: { author: "katorisi", license: "CC BY-SA 3.0", sourceUrl: "https://commons.wikimedia.org/wiki/File:Hirome-Ichiba,Kochi-city,Japan.jpg" },
  },
};
