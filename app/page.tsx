import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signout } from "./actions/connect";
import { Header } from "./components/header";
import { getAllCategorie, getAllProducts } from "@/lib/queries";


export default async function Home() {
    const session = await auth.api.getSession({ headers: await headers() });

    const AllProducts= await getAllProducts()
    const allCategorie = await getAllCategorie()

  return (
    <div>
      <Header></Header>
    
      {allCategorie.map((categorie)=>( <li key={categorie.id}>
        {categorie.name}
      </li> ))}
      <th>****************</th>
      {AllProducts.map((product)=>( <li key={product.id}>
        {product.title}
      </li> ))}
     
      
    
    {session && (
      <form action={signout}>
        <button type="submit" className="bg-white text-black">
          Logout
        </button>
      </form>
    )}
  </div>
  );
}
