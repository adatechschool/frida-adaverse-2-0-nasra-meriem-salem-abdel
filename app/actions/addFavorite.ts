import { db } from "@/lib/db/drizzle";
import { favorites } from "@/lib/db/schema";

    export const addFavorite = async (userId: string, productId: number) => {
        await db.insert(favorites).values({
          userId,
          productId,
        });
      };
