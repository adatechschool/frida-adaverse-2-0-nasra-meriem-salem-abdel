import { getProductsById } from "@/lib/queries";
import ProductClient from "./ProductClient";

type ProductPageParams = {
  id: number;
};

interface ProductsPageProps {
  params: Promise<ProductPageParams>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { id } = await params;
  const product = await getProductsById(id);

  if (!product) {
    return (
      <h1 className="text-center text-xl font-semibold">AUCUN PRODUIT SORRYYYYYY</h1>
    );
  }

  return <ProductClient product={product} />;
}
