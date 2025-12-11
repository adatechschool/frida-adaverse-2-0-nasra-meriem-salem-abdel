import { getAllProducts } from "@/lib/queries";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  slug: string;
  description?: string;
  price_cents: number;
  image_url?: string;
  is_published: boolean;
  owner_id: string;
  category_id: number;
  created_at: string;
  updated_at?: string;
};

// Fonction pour convertir camelCase → snake_case
const convertToSnakeCase = (item: any): Product => ({
  id: item.id,
  title: item.title,
  slug: item.slug,
  description: item.description,
  price_cents: item.priceCents,
  image_url: item.imageUrl,
  is_published: item.isPublished,
  owner_id: item.ownerId,
  category_id: item.categoryId,
  created_at: item.createdAt,
  updated_at: item.updatedAt,
});

export const Products = async () => {
  // Récupérer tous les produits publiés
  const productsFromDb = await getAllProducts();

  // Conversion vers le type Product attendu
  const products: Product[] = productsFromDb.map(convertToSnakeCase);

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded-md shadow-sm">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-48 object-cover mb-4 rounded-md"
            />
          )}
          <Link
            href={`/products/${product.slug}`}
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
};
