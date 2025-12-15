import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signout } from "./actions/connect";
import { Header } from "./components/header";
import { getAllCategorie, getAllProducts } from "@/lib/queries";
import { Categories } from "./components/Categories";



export default async function Home() {
    const session = await auth.api.getSession({ headers: await headers() });

    const allProducts= await getAllProducts()
    const allCategories = await getAllCategorie()

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 grid gap-8 md:grid-cols-[220px,1fr]">
      <Categories categories={allCategories} products={allProducts}></Categories>
    <section>
    {session && (
      <form action={signout}>
        <button type="submit" className="bg-white text-black">
          Logout
        </button>
      </form>
    )}
    </section>
  </main>
  );
}
