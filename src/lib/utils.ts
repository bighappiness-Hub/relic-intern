import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 表示順のシャッフル。
 * 人気順・ランキングで並べず、知名度に関係なくどのスポットも上位に表示されるようにするための仕組み。
 * セッション中は同じ順序を保つため、sessionStorage に保存したシードを使います。
 */
export function sessionShuffle<T>(items: T[]): T[] {
  const KEY = "shuffle-seed";
  let seed = Number(sessionStorage.getItem(KEY));
  if (!seed) {
    seed = Math.floor(Math.random() * 2 ** 31) + 1;
    sessionStorage.setItem(KEY, String(seed));
  }
  // mulberry32
  const rand = () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** 分 → 「1時間30分」形式 */
export function formatMinutes(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}分`;
  return m === 0 ? `${h}時間` : `${h}時間${m}分`;
}
