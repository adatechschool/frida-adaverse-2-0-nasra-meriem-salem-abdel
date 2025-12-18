"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Fav from "./Fav";

type FavClientProps = {

  productId: number;
  userId: string;
  productName: string;
  productSlug: string; // pour le lien
};

export default function FavClient({ productId, userId, productName, productSlug }: FavClientProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorite = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/favorites/check?userId=${userId}&productId=${productId}`
        );
        const data = await res.json();
        setIsLiked(data.isFavorite);
      } catch (err) {
        console.error("Erreur lors de la vérification du favori :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorite();
  }, [productId, userId]);

  const toggleLike = async () => {
    setLoading(true);
    try {
      const method = isLiked ? "DELETE" : "POST";
      await fetch("/api/favorites", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      setIsLiked(!isLiked);
    } catch (err) {
      console.error("Erreur lors de la mise à jour du favori :", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded border p-3">
        <p className="font-semibold">{productName}</p>
      <Fav id={productId} isLiked={isLiked} onToggleLike={toggleLike} disabled={loading} />
    </div>
  );
}
