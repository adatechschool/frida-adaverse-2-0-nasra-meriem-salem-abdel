import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import AccountClient from "./AccountClient";
import { getAllCategorie, getProductsByOwnerId } from "@/lib/queries";



export default async function AccountPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/auth/sign-in");

  const categories = await getAllCategorie()
  const myProducts = await getProductsByOwnerId(session.user.id)

  return (
    <main>
      <AccountClient user={session.user} categories={categories} products={myProducts} />
    </main>
  );
}
