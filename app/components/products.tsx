"use client";

import React, { useState, useEffect } from "react";
import Fav from "../components/Fav";

type Product = {
  id: number;
  title: string;
  slug: string;
  description?: string | null;
  price_cents?: number;
  priceCents?: number;
  image_url?: string | null;
  imageUrl?: string | null;
};

type ProductsProps = {
  products: Product[];
};

export default function Products({ products }: ProductsProps) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored).map((v: any) => Number(v)) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
    
    window.dispatchEvent(new CustomEvent("favorites-updated", { detail: favorites }));
  }, [favorites]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {products.map(product => (
        <div key={product.id} className="relative border p-4 rounded-md">
          <div className="absolute top-2 right-2 z-10"> 
            <Fav
              id={product.id}
              isLiked={favorites.includes(product.id)}
              onToggleLike={() => toggleFavorite(product.id)}
            />
          </div>

          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p>{product.description}</p>
          <p className="font-bold">
            {(((product.price_cents ?? product.priceCents) || 0) / 100).toFixed(2)} €
          </p>
        </div>
      ))}
    </div>
  );
}