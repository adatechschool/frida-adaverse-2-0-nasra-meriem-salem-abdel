"use server"

import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db/drizzle";
import { products } from "@/lib/db/schema";
import { auth } from "@/lib/auth";



export const deleteProduct = async (formData : FormData) => {
    const session = await auth.api.getSession({headers: await headers()})
    if (!session?.user?.id) {
        redirect("/auth/sign-in")
      }
    const raw = formData.get("productId")
    const productId = Number(raw)
    
    if (!(productId > 0)) {
        redirect("/account?error=invalid_id")
      }
    
    
    const deleted = await db
      .delete(products)
      .where(
        and(eq(products.id, productId), eq(products.ownerId, session.user.id))
      )
      .returning({ id: products.id })
  
      if (deleted.length === 0) {
        redirect("/account?error=not_allowed")
      }

    
    revalidatePath("/account"); // raffraichit données
    redirect("/account"); // raffraichit
}


