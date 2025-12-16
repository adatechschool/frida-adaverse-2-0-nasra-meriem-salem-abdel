"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Fav from "../components/Fav";

type Product = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  price_cents: number;
  image_url?: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  // Charger favoris depuis localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // Sauvegarder favoris à chaque changement
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
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
          {/* Bouton favori */}
          <div className="absolute top-2 right-2">
            <Fav
              id={product.id}
              isLiked={favorites.includes(product.id)}
              onToggleLike={() => toggleFavorite(product.id)}
            />
          </div>

          <Link href={`/products/${product.id}`}>
            <h2 className="text-lg font-semibold">{product.title}</h2>
          </Link>

          <p>{product.description}</p>
          <p className="font-bold">{(product.price_cents / 100).toFixed(2)} €</p>
        </div>
      ))}
    </div>
  );
}
