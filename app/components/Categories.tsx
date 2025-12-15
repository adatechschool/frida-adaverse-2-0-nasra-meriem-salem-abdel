import Link from "next/link"

type Category = {
    id: number;
    name:  string,
}

type Products = {
    id: number,
    title: string,
}

type CategoriesProps= {
    categories: Category[]
    products : Products[]
}

export const Categories =  ({categories, products}:CategoriesProps) => {

    return (
      <section className="mb-8  border-zinc-700 pb-4">
        <h2 className="mb-10 text-xl font-semibold">
          Catégories
        </h2>
        <ul className="flex flex-col gap-10 mt-15">
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href="#"
                className="text-1xl border p-2 rounded bg-zinc-500 text-white "
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
}