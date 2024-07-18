import { Provider } from "next-auth/providers/index";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { Lobster } from "next/font/google";
import { SessionUser } from "./api/auth/[...nextauth]";

const lobster = Lobster({ weight: "400", subsets: ["latin-ext"] });

export default function Login({
  providers,
}: {
  providers: { [provider: string]: Provider };
}) {
  const { data: session } = useSession();

  return (
    <main className="">
      <h1>Login</h1>
      {session && (
        <div>
          <h2>Signed in as {session.user?.email}</h2>
          <h3>Token: {session.user.accessToken}</h3>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: "/",
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </main>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
