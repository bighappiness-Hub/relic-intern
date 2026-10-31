import { Link } from "react-router-dom";

import { NAV_ITEMS } from "@/components/layout/Header";
import { PREFECTURES } from "@/data/master";

export function Footer() {
  return (
    <footer className="mt-20 bg-primary text-primary-foreground">
      <div className="bg-seigaiha h-6 text-primary-foreground/10" />
      <div className="container grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-serif text-xl font-bold tracking-wider">四国めぐり帖</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
            有名な場所も、まだ知られていない場所も、同じ目線で。四国4県に点在する魅力をつなぎ、旅の選択肢を広げる観光案内サイトです。
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs tracking-[0.2em] text-primary-foreground/60">MENU</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                トップ
              </Link>
            </li>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs tracking-[0.2em] text-primary-foreground/60">AREA</p>
          <ul className="space-y-2 text-sm">
            {PREFECTURES.map((p) => (
              <li key={p.id}>
                <Link to={`/?pref=${p.id}`} className="hover:underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <p className="container py-5 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} 四国めぐり帖 ／ 掲載情報は目安です。お出かけ前に各施設の最新情報をご確認ください。
        </p>
      </div>
    </footer>
  );
}
