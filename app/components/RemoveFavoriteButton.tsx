"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleFavorite } from "../actions/toggleFavorite";

export default function RemoveFavoriteButton({ productId }: { productId: number }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onRemove = () => {
    startTransition(async () => {
      await toggleFavorite(productId);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={onRemove}
      disabled={isPending}
      className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
    >
    
    </button>
  );
}
