import Link from "next/link";
import { getCategorieBySlug, getProductsByCategorySlug } from "@/lib/queries";

type PageParams = { slug: string };
type PageProps = { params: Promise<PageParams> };

export default async function CategoriesSlug({ params }: PageProps) {
  const { slug } = await params;
  const normalizedSlug = decodeURIComponent(slug).trim().toLowerCase();

  const categorie = await getCategorieBySlug(normalizedSlug);

  if (!categorie) {
    return <main>Catégorie introuvable</main>;
  }

  const produits = await getProductsByCategorySlug(normalizedSlug);

  return (
    <main>
      <h1>{categorie.name}</h1>
      <p>Description : {categorie.description}</p>

      <ul>
        {produits.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`}>
              {p.title} – {p.priceCents / 100} €
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
