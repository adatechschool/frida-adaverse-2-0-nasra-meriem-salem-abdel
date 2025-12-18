import { NextResponse } from "next/server";
import { isFavorite } from "@/lib/queries";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const productId = url.searchParams.get("productId");

  if (!userId || !productId) {
    return NextResponse.json({ isFavorite: false });
  }

  const favorite = await isFavorite(userId, Number(productId));

  return NextResponse.json({ isFavorite: favorite });
}
