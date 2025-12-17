"use client";

import { useEffect, useState } from "react";
import Fav from "../components/Fav";

type Product = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  price_cents?: number;
  priceCents?: number;
  image_url?: string;
  imageUrl?: string;
};

type FavorisProps = {
  products?: Product[];
};

export default function Favoris({ products }: FavorisProps) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored).map(Number) : [];
    } catch { return []; }
  });

  const [allProducts, setAllProducts] = useState<Product[] | null>(products ?? null);

  useEffect(() => {
    if (products) return; // parent provided products

    let mounted = true;
    (async () => {
      try {
        const res = await fetch("/api/products");
        if (!mounted) return;
        if (!res.ok) return;
        const json = await res.json();
        setAllProducts(json as Product[]);
      } catch {
        // ignore fetch errors
      }
    })();

    return () => {
      mounted = false;
    };
  }, [products]);

  // Synchronise les favoris avec localStorage lorsque l'état change localement
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Écoute l'événement global pour se mettre à jour si l'état change ailleurs (ex: dans Products.tsx)
  useEffect(() => {
    const handler = (e: Event) => {
      const detail: any = (e as any).detail;
      if (Array.isArray(detail)) setFavorites(detail.map(Number));
      else {
        const stored = localStorage.getItem("favorites");
        if (stored) setFavorites(JSON.parse(stored).map(Number));
      }
    };
    window.addEventListener("favorites-updated", handler as EventListener);
    return () => window.removeEventListener("favorites-updated", handler as EventListener);
  }, []);

  const toggleFavorite = (id: number) => {
    // Inverse l'état local du favori
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
    // Note: L'effet secondaire useEffect gérera la mise à jour de localStorage et l'événement global
  };

  const sourceProducts = products ?? allProducts ?? [];
  // Filtre les produits pour n'afficher que ceux qui sont dans la liste 'favorites'
  const likedProducts = sourceProducts.filter(p => favorites.includes(Number(p.id)));

  if (likedProducts.length === 0) {
    return <p className="text-center mt-6 text-lg">Aucun favori pour le moment ⭐</p>;
  }

  return (
    <ul className="grid gap-6 mt-6">
      {likedProducts.map(product => (
        <li key={product.id} className="border rounded-xl p-4 relative">
          <div className="absolute top-2 right-2 z-10"> {/* Ajout de z-10 */}
            <Fav
              id={product.id}
              isLiked={favorites.includes(product.id)}
              onToggleLike={() => toggleFavorite(product.id)}
            />
          </div>

          <h2 className="text-xl font-semibold">{product.title}</h2>
          <p>{product.description}</p>
          <p className="font-bold mt-2">{(((product.price_cents ?? product.priceCents) || 0)/100).toFixed(2)} €</p>
        </li>
      ))}
    </ul>
  );
}