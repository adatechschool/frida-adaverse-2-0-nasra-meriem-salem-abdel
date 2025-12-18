

import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import { getAllProductsWithFavorite } from "@/lib/queries";
import FavoriteToggleButton from "./FavoriteToggleBtn";

type Product = {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  priceCents: number;
  imageUrl: string | null;
  isFavorite: boolean;
};

export const Products = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  // ✅ ici on récupère BIEN un tableau
  const products: Product[] = await getAllProductsWithFavorite(
    session?.user.id
  );

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="relative border p-4 rounded-md shadow-sm"
        >
          {/* ❤️ FAVORI */}
          <div className="absolute right-3 top-3 z-10">
            <FavoriteToggleButton
              productId={product.id}
              initialIsFavorite={product.isFavorite}
            />
          </div>

          {product.imageUrl && (
            <div className="mb-4 overflow-hidden rounded-md border">
              <CldImage
                src={product.imageUrl}
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
            {(product.priceCents / 100).toFixed(2)} €
          </p>
        </div>
      ))}
    </div>
  );
};
