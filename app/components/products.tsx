import { getAllProducts } from "@/lib/queries";
import Link from "next/link";
import { CldImage } from "next-cloudinary";

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
          <div className="absolute top-2 right-2">
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
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-md shadow-sm">


{product.image_url && (
  <div className="mb-4 overflow-hidden rounded-md border">
    <CldImage
      src={product.image_url}   // public_id
      width="800"
      height="400"
      alt={product.title}
      className="h-48 w-full object-cover"
    />
  </div>
)}



          <Link
            href={`/products/${product.id}`}
            className="text-xl font-semibold text-blue-600 hover:underline"
          >
            {product.title}
            
          </Link>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-green-600 font-bold mt-1">
            {(product.price_cents / 100).toFixed(2)} €
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Catégorie ID: {product.category_id} | Propriétaire: {product.owner_id}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Créé le: {new Date(product.created_at).toLocaleDateString()} 
            {product.updated_at && ` | Mis à jour: ${new Date(product.updated_at).toLocaleDateString()}`}
          </p>
        </div>
      ))}
    </div>
  );
}
