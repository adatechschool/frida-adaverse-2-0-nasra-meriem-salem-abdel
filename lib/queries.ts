import {db} from "@/lib/db/drizzle";
import { categories,products,comments } from "./db/schema";

import { eq } from "drizzle-orm";

export const getAllProducts = async () => {
  const ProductDb = await db.select().from(products)
    
    return ProductDb;
    
}

export const getAllCategorie = async () => {
  const CategorieDb = await db.select().from(categories)
    
    return CategorieDb;
    
}