import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { installationCategories } from "@/lib/installations";
import { cities } from "@/lib/cities";
import { posts } from "@/lib/posts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://solteva.com";
const LOCALES = ["es", "en"] as const;

const CATEGORY_SLUGS: Record<string, string> = {
  stairlifts: "sillas-salvaescaleras",
  platforms: "plataformas",
  verticalLifts: "elevadores-verticales",
  poolLift: "grua-piscina",
  ramps: "rampas",
};

function entry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
): MetadataRoute.Sitemap[number][] {
  return LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`])),
        "x-default": `${BASE_URL}/es${path}`,
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    ...entry("", 1.0, "weekly"),
    ...entry("/empresa", 0.7),
    ...entry("/productos", 0.9, "weekly"),
    ...entry("/instalaciones", 0.7),
    ...entry("/delegaciones", 0.7),
    ...entry("/contacto", 0.8, "monthly"),
    ...entry("/politica-privacidad", 0.3),
    // Category pages
    ...entry("/productos/sillas-salvaescaleras", 0.9, "weekly"),
    ...entry("/productos/plataformas", 0.8, "weekly"),
    ...entry("/productos/elevadores-verticales", 0.8, "weekly"),
    ...entry("/productos/grua-piscina", 0.7, "monthly"),
    // Projects & services
    ...entry("/proyectos", 0.8, "monthly"),
    ...entry("/servicios", 0.8, "monthly"),
    ...entry("/servicios/mantenimiento", 0.7, "monthly"),
    ...entry("/servicios/sat", 0.7, "monthly"),
    ...entry("/servicios/garantia", 0.7, "monthly"),
  ];

  const productRoutes = products.flatMap((p) => {
    const catSlug = CATEGORY_SLUGS[p.category];
    if (!catSlug) return [];
    return entry(`/productos/${catSlug}/${p.slug}`, 0.85, "monthly");
  });

  const installationRoutes = installationCategories.flatMap((cat) =>
    entry(`/instalaciones/${cat.slug}`, 0.65, "monthly")
  );

  const cityRoutes = cities.flatMap((city) =>
    entry(`/sillas-salvaescaleras/${city.slug}`, 0.8, "monthly")
  );

  const blogRoutes = [
    ...entry("/recursos", 0.75, "weekly"),
    ...posts.flatMap((p) => entry(`/recursos/${p.slug}`, 0.7, "monthly")),
    ...entry("/glosario", 0.6, "monthly"),
    ...entry("/productos/rampas", 0.65, "monthly"),
  ];

  return [...staticRoutes, ...productRoutes, ...installationRoutes, ...cityRoutes, ...blogRoutes];
}
