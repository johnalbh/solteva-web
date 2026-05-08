import Link from "next/link";
import { Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTABannerProps {
  title: string;
  subtitle?: string;
  quoteLabel: string;
  callLabel: string;
  quoteHref: string;
}

export default function CTABanner({
  title,
  subtitle,
  quoteLabel,
  callLabel,
  quoteHref,
}: CTABannerProps) {
  return (
    <section className="bg-[var(--primary)] text-white py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">{title}</h2>
        {subtitle && (
          <p className="text-lg text-white/80 mb-8">{subtitle}</p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={quoteHref}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-[var(--accent-foreground)] font-bold h-14 px-8"
            )}
          >
            {quoteLabel}
          </Link>
          <a
            href="tel:+34900100133"
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "border-white/50 text-white hover:bg-white/10 hover:text-white font-bold h-14 px-8 bg-transparent"
            )}
          >
            <Phone size={18} className="mr-2" aria-hidden />
            {callLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
