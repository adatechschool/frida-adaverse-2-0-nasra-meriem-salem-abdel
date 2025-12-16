"use client";

import React, { useEffect, useState } from "react";
import Fav from "@/app/components/Fav";

type Product = {
  id: number;
  title: string;
  description?: string | null;
  priceCents: number;
  ownerId?: string | number;
  imageUrl?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date | null;
};

export default function ProductClient({ product }: { product: Product }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(Array.isArray(parsed) ? parsed.map(Number) : []);
      } catch (e) {
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => (prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]));
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="relative">
        <div className="absolute top-0 right-0">
          <Fav id={product.id} isLiked={favorites.includes(product.id)} onToggleLike={() => toggleFavorite(product.id)} />
        </div>

        <h1 className="mb-4 text-2xl font-bold">{product.title}</h1>
        <p className="mb-2 text-lg font-semibold">{product.description}</p>
        <p className="mb-1 text-lg font-semibold">Prix : {(product.priceCents / 100).toFixed(2)} €</p>
        <p className="text-lg font-semibold">Vendeur : {product.ownerId}</p>
      </div>
    </main>
  );
}
