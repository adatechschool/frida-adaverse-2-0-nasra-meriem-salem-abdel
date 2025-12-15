import Link from "next/link"

type Category = {
    id: number;
    name:  string,
    slug : string,
}

type Products = {
    id: number,
    title: string,
    slug: string,
    category_id:number,
}

type CategoriesProps= {
    categories: Category[]
    products : Products[]
}

export const Categories =  ({categories, products}:CategoriesProps) => {

    
    return (
        <section className="mb-8 border-zinc-700 pb-4">
          <h2 className="mb-10 text-xl font-semibold">Catégories</h2>
      
          <ul className="flex flex-col gap-10 mt-15">
            {categories.map((category) => {
              const productsForCategory = products.filter(
                (product) => product.category_id === category.id
              );
      
              return (
                <li key={category.id} className="space-y-3">
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-1xl border p-2 rounded bg-zinc-500 text-white inline-block"
                  >
                    {category.name}
                  </Link>
                  {productsForCategory.length > 0 ? (
                    <ul className="pl-4 space-y-2">
                      {productsForCategory.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/products/${product.id}`}
                            className="text-black hover:underline"
                          >
                            {product.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="pl-4 text-sm text-zinc-400">
                      Aucun produit dans cette catégorie
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      );      
}