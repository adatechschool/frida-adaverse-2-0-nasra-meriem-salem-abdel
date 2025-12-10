import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Header } from "./components/header";

export default async function Home() {
    const session = await auth.api.getSession({ headers: await headers() });

  return (
    <div>
      <pre>
        {/* {session ? JSON.stringify(session.user, null, 2) : "Not connected"} */}
      </pre>
      <Header></Header>
    </div>
  );
}
