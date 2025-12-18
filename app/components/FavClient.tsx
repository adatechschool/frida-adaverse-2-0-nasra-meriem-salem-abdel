"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import Fav from "./Fav";
import { toggleFavorite } from "../actions/toggleFavorite";

type FavClientProps = {
  productId: number;
  productName: string;
  productSlug: string;
  initialIsFavorite: boolean;
};

export default function FavClient({
  productId,
  productName,
  productSlug,
  initialIsFavorite,
}: FavClientProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();

  const onToggle = () => {
    startTransition(async () => {
      try {
        const res = await toggleFavorite(productId);
        setIsFavorite(res.isFavorite);
      } catch (err) {
        console.error("Erreur toggle favoris:", err);
      }
    });
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded border p-3">
      <Link href={`/products/${productSlug}`} className="flex-1">
        <p className="font-semibold">{productName}</p>
      </Link>

      <Fav isLiked={isFavorite} id={productId} onToggleLike={onToggle} disabled={isPending} />
    </div>
  );
}
