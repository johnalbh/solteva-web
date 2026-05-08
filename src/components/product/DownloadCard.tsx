import { FileDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductPdf } from "@/lib/products";

interface DownloadCardProps {
  pdfs: ProductPdf[];
  locale: string;
  downloadLabel: string;
}

export default function DownloadCard({ pdfs, locale, downloadLabel }: DownloadCardProps) {
  if (!pdfs.length) return null;

  return (
    <div className="flex flex-wrap gap-3">
      {pdfs.map((pdf, i) => (
        <a
          key={i}
          href={pdf.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "gap-2"
          )}
          download
        >
          <FileDown size={16} aria-hidden />
          {locale === "es" ? pdf.labelEs : pdf.labelEn}
        </a>
      ))}
    </div>
  );
}
