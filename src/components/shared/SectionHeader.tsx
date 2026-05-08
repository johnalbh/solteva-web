import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", "mb-10 lg:mb-14", className)}>
      <h2
        className={cn(
          "font-display text-3xl lg:text-4xl font-bold mb-4",
          light ? "text-white" : "text-ink"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-lg leading-relaxed max-w-3xl",
            centered && "mx-auto",
            light ? "text-white/80" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
