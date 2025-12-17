"use client";

import React, { useState } from "react";
import Fav from "../components/Fav";

type Product = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  isPublished: boolean;
  ownerId: string;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date | null;
};

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div>
      <h1>{product.title}</h1>

      <Fav
        id={product.id}
        isLiked={isLiked}
        onToggleLike={() => setIsLiked((prev) => !prev)}
      />
    </div>
  );
}
