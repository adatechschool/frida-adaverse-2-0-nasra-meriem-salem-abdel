import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

type Session = Awaited<ReturnType<typeof auth.api.getSession>>;

export default async function AccountPage() {
  const session: Session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/auth/sign-in");

  return (
    <main>
      <h1>Mon compte</h1>

      <ul>
        <li>
          <b>User ID :</b> {session.user.id}
        </li>

        {"email" in session.user && session.user.email && (
          <>
            <li>
              <b>Email :</b> {String(session.user.email)}
            </li>

            <li>
              <b>Nom :</b> {String(session.user.name)}
            </li>
          </>
        )}
      </ul>
    </main>
  );
}
