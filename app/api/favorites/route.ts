import { NextRequest, NextResponse } from "next/server";
import { getFavoritesByUser,addFavorite } from "@/lib/queries";           
import { favorites } from "@/lib/db/schema";
import { db } from "@/lib/db/drizzle";
import { and, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId manquant" }, { status: 400 });
  }

  try {
    const favorites = await getFavoritesByUser(userId);
    return NextResponse.json(favorites);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId, productId } = await req.json();

  if (!userId || !productId) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  try {
    await addFavorite(userId, productId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { userId, productId } = await req.json();

  if (!userId || !productId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  await db
    .delete(favorites)
    .where(and(eq(favorites.userId, userId), eq(favorites.productId, productId)));

  return NextResponse.json({ success: true });
}
