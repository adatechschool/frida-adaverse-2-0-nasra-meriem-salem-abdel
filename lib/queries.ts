import {db} from "@/lib/db/drizzle";
import { categories,products,comments, favorites} from "./db/schema"
import {users} from "./db/auth-schema"
import { eq, ilike, and,desc, sql } from "drizzle-orm";

export const getAllProducts = async () => {
  const ProductDb = await db.select().from(products)
    
    return ProductDb;
    
}

export const getAllCategorie = async () => {
  const CategorieDb = await db.select().from(categories)
    
    return CategorieDb;
}



export const getProductsById = async (id: number) => {
  const result = await db
    .select({
      id: products.id,
      title: products.title,
      slug: products.slug,
      description: products.description,
      priceCents: products.priceCents,
      imageUrl: products.imageUrl,
      isPublished: products.isPublished,
      ownerId: products.ownerId,
      sellerName: users.name,
      categoryName: categories.name,
    })
    .from(products)
    .innerJoin(users, eq(products.ownerId, users.id))         
    .innerJoin(categories, eq(products.categoryId, categories.id)) 
    .where(eq(products.id, id));

  return result[0];
};




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



export const getAllProductsWithFavorite = async (userId?: string) => {
  // si pas connecté: aucun favori
  if (!userId) {
    const result = await db.select().from(products);
    return result.map((p) => ({ ...p, isFavorite: false }));
  }

  const result = await db
    .select({
      id: products.id,
      title: products.title,
      slug: products.slug,
      description: products.description,
      priceCents: products.priceCents,
      imageUrl: products.imageUrl,
      isPublished: products.isPublished,
      ownerId: products.ownerId,
      categoryId: products.categoryId,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,

      isFavorite: sql<boolean>`(${favorites.userId} is not null)`.as("is_favorite"),
    })
    .from(products)
    .leftJoin(
      favorites,
      and(eq(favorites.productId, products.id), eq(favorites.userId, userId))
    );

  return result;
};



export const getPublishedProductsWithFavorite = async (userId?: string) => {
  // si pas connecté, isFavorite = false partout
  if (!userId) {
    const result = await db.select().from(products).where(eq(products.isPublished, true));
    return result.map((p) => ({ ...p, isFavorite: false }));
  }

  const result = await db
    .select({
      id: products.id,
      title: products.title,
      slug: products.slug,
      description: products.description,
      priceCents: products.priceCents,
      imageUrl: products.imageUrl,
      isPublished: products.isPublished,
      categoryId: products.categoryId,
      createdAt: products.createdAt,
      updatedAt: products.updatedAt,

      // ✅ bool : favori ou non
      isFavorite: sql<boolean>`(${favorites.userId} is not null)`.as("is_favorite"),
    })
    .from(products)
    .leftJoin(
      favorites,
      and(eq(favorites.productId, products.id), eq(favorites.userId, userId))
    )
    .where(eq(products.isPublished, true));

  return result;
};
