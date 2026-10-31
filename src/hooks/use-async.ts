import { useEffect, useState, type DependencyList } from "react";

/**
 * 非同期データ取得の小さなフック。
 * Supabase 接続後も api.ts の関数を渡すだけで同じように使えます。
 * （規模が大きくなったら TanStack Query への置き換えも容易です）
 */
export function useAsync<T>(fn: () => Promise<T>, deps: DependencyList) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fn()
      .then((result) => !cancelled && setData(result))
      .catch((e: unknown) => !cancelled && setError(e instanceof Error ? e : new Error(String(e))))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
