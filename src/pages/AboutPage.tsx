import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const SECTIONS = [
  {
    title: "解決したい課題",
    body: "日本各地には魅力的な観光スポットが数多くあります。しかしSNSなどで話題になる一部のスポットに注目が集まり、ほかの場所の魅力は旅行者に十分届いていません。その結果、特定の場所では渋滞や混雑が起き、すぐ近くのスポットでは観光資源が活かしきれていない——そんな偏りが生まれています。",
  },
  {
    title: "四国めぐり帖の考え方",
    body: "大手の観光情報サイトやSNSは、人気順・ランキング・写真映えで情報が並ぶため、どうしても有名な場所に目が向きます。このサイトは四国という一つの地域に絞り、小さなスポットや文化・暮らしに触れられる場所も、有名な名所と同じ扱いで紹介します。一覧の表示順もランダムにし、知名度に左右されずに選べるようにしています。",
  },
  {
    title: "ルートで人の流れを広げる",
    body: "スポットを個別に紹介するだけでなく、有名な起点スポットと周辺スポットを組み合わせたルートとして提案します。旅行者は効率よく回れて、名所に集中していた人の流れが自然と周辺へ広がる。観光客の分散という課題の解決を、サイトの仕組みそのものに組み込んでいます。",
  },
];

export function AboutPage() {
  return (
    <div className="container max-w-3xl py-12 md:py-20">
      <p className="mb-2 text-xs font-medium tracking-[0.3em] text-accent">ABOUT</p>
      <h1 className="text-balance text-3xl font-bold leading-snug md:text-4xl">
        有名な場所も、まだ知られていない場所も、
        <br className="hidden md:block" />
        同じ目線で。
      </h1>
      <div className="mt-12 space-y-12">
        {SECTIONS.map((s, i) => (
          <section key={s.title} className="grid gap-4 md:grid-cols-[80px_1fr]">
            <p className="font-serif text-4xl font-bold text-primary/20">0{i + 1}</p>
            <div>
              <h2 className="text-xl font-bold md:text-2xl">{s.title}</h2>
              <p className="mt-4 leading-loose text-foreground/85">{s.body}</p>
            </div>
          </section>
        ))}
      </div>
      <div className="mt-16 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link to="/routes">
            周遊ルートを見る <ArrowRight />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link to="/spots">スポットを探す</Link>
        </Button>
      </div>
    </div>
  );
}
