import {db} from "@/lib/db/drizzle";
import { categories,products,comments} from "./db/schema";
import {users} from "@/auth-schema";
import { favorites } from "@/lib/db/schema";
import { eq, ilike , and, desc} from "drizzle-orm";


export const getAllProducts = async () => {
  const ProductDb = await db.select().from(products)
    
    return ProductDb;
    
}

export const getAllCategorie = async () => {
  const CategorieDb = await db.select().from(categories)
    
    return CategorieDb;
}


export const getProductsById = async (id:number)=> {
  const result = await db.select()
  .from(products)
  .where(eq(products.id, id))

  return result[0]   
}

export const getProductsByCategorySlug = async (slug: string) => {
  const result = await db
    .select({
      id: products.id,
      title: products.title,
      slug: products.slug,
      priceCents: products.priceCents,
      imageUrl: products.imageUrl,
    })
    .from(products)
    .innerJoin(
      categories,
      eq(products.categoryId, categories.id)
    )
    .where(ilike(categories.slug, slug));

  return result;
};

export const getCategorieBySlug = async(slug:string)=>{ 
  const result = await db
    .select()
    .from(categories)
    .where(ilike(categories.slug, slug)); // ✅ comme ton getProductsByCategorySlug

  return result[0]; // ✅ une seule catégorie
}

export const getComment = async (productId:number)=>{
    const  result = await db.select({
    id: comments.id,
    content: comments.content,
    authorId: comments.authorId,
    updatedAt: comments.updatedAt,
    createdAt: comments.createdAt,
    authorName: users.name,
  
  })
  .from(comments)
  .leftJoin(users,eq(comments.authorId,users.id))
  .where(
    and(
      eq(comments.productId, productId),
       eq(comments.isDeleted, false)
      )
    )
  .orderBy(desc(comments.createdAt))


  return result 
}


export const getProductsByOwnerId = async (ownerId: string) => {
  const result = await db
    .select({
      id: products.id,
      title: products.title,
      slug: products.slug,
      description: products.description,
      priceCents: products.priceCents,
      imageUrl: products.imageUrl,
      isPublished: products.isPublished,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,
      categoryId: products.categoryId,
      categoryName: categories.name, 
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .where(eq(products.ownerId, ownerId));

  return result;
};

export const addFavorite = async (userId: string, productId: number) => {
  await db.insert(favorites).values({
    userId,
    productId,
  });
};

export const removeFavorite = async (userId: string, productId: number) => {
  await db
    .delete(favorites)
    .where(
      and(
        eq(favorites.userId, userId),
        eq(favorites.productId, productId)
      )
    );
};
export const isFavorite = async (userId: string, productId: number) => {
  const result = await db
    .select()
    .from(favorites)
    .where(
      and(
        eq(favorites.userId, userId),
        eq(favorites.productId, productId)
      )
    );

  return result.length > 0;
};

export const getFavoritesByUser = async (userId: string) => {
  const result = await db
    .select({
      id: products.id,
      title: products.title,
      priceCents: products.priceCents,
      imageUrl: products.imageUrl,
    })
    .from(favorites)
    .innerJoin(products, eq(favorites.productId, products.id))
    .where(eq(favorites.userId, userId));

  return result;
};

