"use client";

import Link from "next/link";
import { CldImage } from "next-cloudinary";

export default function ProductCardSlug({
  id,
  title,
  priceCents,
  imageUrl,
}: {
  id: number;
  title: string;
  priceCents: number;
  imageUrl?: string | null;
}) {
  return (
    <Link
      href={`/products/${id}`}
      className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-44 w-full bg-zinc-100">
        {imageUrl ? (
          <CldImage
            src={imageUrl}
            width="900"
            height="600"
            alt={title}
            className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          />
        ) : (
          <div className="h-full w-full" />
        )}
      </div>

      <div className="p-4">
        <h2 className="line-clamp-2 text-base font-semibold text-zinc-900">{title}</h2>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-lg font-bold text-zinc-900">
            {(priceCents / 100).toFixed(2)} €
          </p>
          <span className="text-sm text-zinc-500 group-hover:text-zinc-700">Voir →</span>
        </div>
      </div>
    </Link>
  );
}
