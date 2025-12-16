"use client";

import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  cover_url?: string;
  description?: string;
  price_cents: number;
  url?: string;
};

export default function Favoris() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(setProducts);

    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  const likedProducts = products.filter(p => favorites.includes(p.id));

  if (likedProducts.length === 0) {
    return (
      <p className="text-center mt-6 text-lg">
        Aucun favori pour le moment ⭐
      </p>
    );
  }

  return (
    <ul className="grid gap-6 mt-6">
      {likedProducts.map(product => (
        <li key={product.id} className="border rounded-xl p-4">
          {product.cover_url && (
            <img
              src={product.cover_url}
              alt={product.title}
              className="rounded-xl w-full h-56 object-cover"
            />
          )}

          <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
          <p>{product.description}</p>
          <p className="font-bold mt-2">{(product.price_cents / 100).toFixed(2)} €</p>

          {product.url && (
            <button
              onClick={() => window.open(product.url, "_blank")}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 w-fit mt-2"
            >
              Voir le produit
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}
