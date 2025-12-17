import { NextResponse } from "next/server";
import { getAllProducts } from "@/lib/queries";

export async function GET() {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
