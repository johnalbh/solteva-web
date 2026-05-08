"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [failed, setFailed] = useState<Set<string>>(new Set());

  const validImages = images.filter(Boolean).filter((img) => !failed.has(img));

  const prev = () => setCurrent((c) => (c - 1 + validImages.length) % validImages.length);
  const next = () => setCurrent((c) => (c + 1) % validImages.length);
  const safeIdx = Math.min(current, Math.max(validImages.length - 1, 0));

  // No images — Apple-style placeholder
  if (!validImages.length) {
    return (
      <div
        className="flex flex-col items-center justify-center aspect-[4/3]"
        style={{ background: "rgb(245,245,247)", borderRadius: "var(--corner-radius)" }}
      >
        <ImageOff size={48} style={{ color: "rgb(134,134,139)", marginBottom: 12 }} aria-hidden />
        <p style={{ fontSize: "0.88rem", color: "rgb(134,134,139)", letterSpacing: "-0.01em" }}>
          Imágenes disponibles al solicitar información
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="relative aspect-[4/3] overflow-hidden cursor-zoom-in group"
          style={{ borderRadius: "var(--corner-radius)", background: "rgb(245,245,247)" }}
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
          aria-label={`Ver imagen ampliada: ${alt}`}
        >
          <Image
            src={validImages[safeIdx]}
            alt={`${alt} — imagen ${safeIdx + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={safeIdx === 0}
            onError={() => setFailed((prev) => new Set([...prev, validImages[safeIdx]]))}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/8 transition-colors flex items-center justify-center">
            <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-80 transition-opacity" aria-hidden />
          </div>
          {validImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.12)" }}
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.12)" }}
                aria-label="Imagen siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {validImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {validImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  "relative shrink-0 w-16 h-16 overflow-hidden transition-all",
                  i === safeIdx ? "opacity-100 ring-2 ring-[var(--cta-blue)]" : "opacity-50 hover:opacity-90"
                )}
                style={{ borderRadius: 10 }}
                aria-label={`Ver imagen ${i + 1}`}
                aria-current={i === safeIdx}
              >
                <Image
                  src={img}
                  alt={`${alt} — miniatura ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                  onError={() => setFailed((prev) => new Set([...prev, img]))}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal
          aria-label="Galería ampliada"
        >
          <button onClick={() => setLightboxOpen(false)} className="absolute top-5 right-5 text-white/60 hover:text-white p-2" aria-label="Cerrar">
            <X size={26} />
          </button>
          {validImages.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2" aria-label="Anterior">
                <ChevronLeft size={32} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white p-2" aria-label="Siguiente">
                <ChevronRight size={32} />
              </button>
            </>
          )}
          <div className="relative max-w-4xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={validImages[safeIdx]}
              alt={`${alt} — imagen ${safeIdx + 1}`}
              width={1200}
              height={900}
              className="object-contain w-full h-full max-h-[85vh]"
            />
            <p className="text-center text-white/40 text-xs mt-2">{safeIdx + 1} / {validImages.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
