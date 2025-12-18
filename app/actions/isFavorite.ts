import { db } from "@/lib/db/drizzle";
import { favorites } from "@/lib/db/schema";
import { and,eq } from "drizzle-orm";

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