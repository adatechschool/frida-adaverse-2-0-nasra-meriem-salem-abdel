import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { signout } from "./actions/connect";
import { Header } from "./components/header";

export default async function Home() {
    const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div>
      <Header></Header>
    <pre>
      {session ? JSON.stringify(session.user, null, 2) : "Not connected"}
    </pre>
    {session && (
      <form action={signout}>
        <button type="submit" className="bg-white text-black">
          Logout
        </button>
      </form>
    )}
  </div>
  );
}
