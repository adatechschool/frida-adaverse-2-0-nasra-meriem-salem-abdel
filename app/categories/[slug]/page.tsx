import { db } from "@/lib/db/drizzle";
import {categories} from "@/lib/db/schema"
import { eq} from "drizzle-orm"


export default async function CategoriesSlug({
    params,
}:{
    params : Promise <{slug: string}>
}) {
    
    const {slug} = await params
    
    
    const [categorie] = await  db
    .select()
    .from(categories)
    .where(eq(categories.slug, slug))

    if (!categorie){
        return ("Cherche mieux ta catégorie ! allez éloigne moi ")
    }
    return (
        <main>
<h1> {categorie.name} </h1>
<p> Description : {categorie.description}</p>

</main>
    ) 
}
