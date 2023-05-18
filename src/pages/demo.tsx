import { Book } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

import { api } from "~/utils/api";


const AuthShowcase: React.FC = () => {
    const { data: sessionData } = useSession();
  
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => signOut() : () => signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    );
  };
  
  
const DemoShowcase = () => {
    const { data: session } = useSession();
    const hello = api.hello.useQuery({ text: session?.user.name });
  
    return <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[rgb(46,2,109)] to-slate-900">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-purple-400">T3</span> App
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-md flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="https://create.t3.gg/en/usage/first-steps"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">First Steps →</h3>
            <div className="text-md">Just the basics</div>
          </Link>
          <Link
            className="flex max-w-sm flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href="/posts"
          >
            <h3 className="relative flex items-center gap-2 text-2xl font-bold">
              <Book />
              Posts
              <span className="absolute right-52 top-0 flex h-5 w-5 animate-bounce items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-700 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-indigo-500" />
              </span>
            </h3>
            <div className="text-md">
              See what others post and submit your own
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl">
            {hello.data ? hello.data.greeting : "Loading tRPC query..."}
          </p>
          <AuthShowcase />
        </div>
      </div>
    </main>;
  }

  export default DemoShowcase;