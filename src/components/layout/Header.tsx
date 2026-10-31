import { Menu } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PREFECTURES, PREFECTURE_STYLE } from "@/data/master";
import { cn } from "@/lib/utils";

export const NAV_ITEMS = [
  { to: "/", label: "地図で探す" },
  { to: "/spots", label: "スポット一覧" },
  { to: "/routes", label: "周遊ルート" },
  { to: "/about", label: "このサイトについて" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-serif text-lg font-bold text-primary-foreground">
        四
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-lg font-bold tracking-wider">四国めぐり帖</span>
        <span className="block text-[10px] tracking-[0.2em] text-muted-foreground">SHIKOKU MEGURI-CHO</span>
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="メインナビゲーション">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary",
                  isActive ? "text-primary" : "text-foreground/80",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="メニューを開く">
              <Menu className="!h-6 !w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[85%] bg-background">
            <SheetHeader>
              <SheetTitle className="font-serif">メニュー</SheetTitle>
              <SheetDescription className="sr-only">サイト内のページへ移動します</SheetDescription>
            </SheetHeader>
            <nav className="mt-6 flex flex-col" aria-label="モバイルナビゲーション">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b py-4 text-base font-medium">
                  {item.label}
                </NavLink>
              ))}
              <p className="mb-3 mt-6 text-xs tracking-widest text-muted-foreground">地図で県を見る</p>
              <div className="grid grid-cols-2 gap-2">
                {PREFECTURES.map((p) => (
                  <Link
                    key={p.id}
                    to={`/?pref=${p.id}`}
                    onClick={() => setOpen(false)}
                    className={cn("rounded-md py-3 text-center text-sm font-bold text-white", PREFECTURE_STYLE[p.id].bg)}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
