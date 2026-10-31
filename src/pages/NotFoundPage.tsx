import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <div className="container flex flex-col items-center py-24 text-center">
      <p className="font-serif text-6xl font-bold text-primary/20">404</p>
      <h1 className="mt-4 text-2xl font-bold">ページが見つかりませんでした</h1>
      <p className="mt-3 text-sm text-muted-foreground">道に迷ってしまったようです。トップページから旅を続けましょう。</p>
      <Button asChild className="mt-8">
        <Link to="/">トップへ戻る</Link>
      </Button>
    </div>
  );
}
