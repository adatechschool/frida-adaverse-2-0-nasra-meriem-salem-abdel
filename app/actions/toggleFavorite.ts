"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db/drizzle";
import { favorites } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(productId: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("UNAUTHORIZED");

  const userId = session.user.id;

  const existing = await db
    .select()
    .from(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.productId, productId)));

  if (existing.length > 0) {
    await db
      .delete(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.productId, productId)));

    revalidatePath("/");
    return { isFavorite: false };
  }

  await db.insert(favorites).values({ userId, productId });

  revalidatePath("/");
  return { isFavorite: true };
}
