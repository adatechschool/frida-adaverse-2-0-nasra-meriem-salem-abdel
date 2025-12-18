"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Fav from "./Fav";
import { toggleFavorite } from "../actions/toggleFavorite";



export default function FavoriteToggleButton({
  productId,
  initialIsFavorite,
}: {
  productId: number;
  initialIsFavorite: boolean;
}) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();

  const onToggleLike = () => {
    startTransition(async () => {
      try {
        // ✅ toggle côté serveur (ajoute si absent, retire si présent)
        await toggleFavorite(productId);

        // ✅ toggle côté UI
        setIsLiked((prev) => !prev);

        // optionnel mais souvent utile si tu relis les favoris côté server
        router.refresh();
      } catch (e) {
        console.error(e);
      }
    });
  };

  return <Fav id={productId} isLiked={isLiked} onToggleLike={onToggleLike} disabled={isPending} />;
}
