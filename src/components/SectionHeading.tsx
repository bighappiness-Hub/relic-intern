import { cn } from "@/lib/utils";

interface Props {
  en: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ en, title, description, align = "left", className }: Props) {
  return (
    <div className={cn("mb-8 md:mb-10", align === "center" && "text-center", className)}>
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-accent">{en}</p>
      <h2 className="text-balance text-2xl font-bold md:text-3xl">{title}</h2>
      {description && (
        <p className={cn("mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base", align === "center" && "mx-auto")}>
          {description}
        </p>
      )}
    </div>
  );
}
