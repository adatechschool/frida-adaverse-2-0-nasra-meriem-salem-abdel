import { getProductsBySlug } from "@/lib/queries";


type ProductPageParams = {
  id: number;
};

interface ProductsPageProps {
  params: Promise<ProductPageParams>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  
  const { id } = await params;
  const product = await getProductsBySlug(id);

  if (!product) {
    return (
        <h1 className="text-center text-xl font-semibold">AUCUN PRODUIT SORRYYYYYY</h1>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-2xl font-bold">{product.title}</h1>
      <p className="mb-2 text-lg font-semibold">
        {product.description}
      </p>
      <p className="mb-1 text-lg font-semibold">
        Prix :{product.priceCents / 100}
      </p>
      <p className="text-lg font-semibold">
        Vendeur : {product.ownerId}
      </p>
    </main>
  );
}
