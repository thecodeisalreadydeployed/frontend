import { useEffect } from "react";
import { useRouter } from "next/router";

import { useSession } from "contexts";

import { Button } from "@atoms";

const SignIn = (): JSX.Element => {
  const router = useRouter();
  const { login, user } = useSession();

  const handleSignIn = () => {
    login();
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <div className="h-screen w-screen overflow-hidden bg-zinc-500">
      <div className="flex h-full items-center justify-center px-16">
        <div className="relative w-full max-w-lg">
          <div className="absolute top-0 -left-4 h-72 w-72 animate-blob rounded-full bg-purple-300 opacity-70 mix-blend-multiply blur-xl"></div>
          <div className="absolute top-0 -right-4 h-72 w-72 animate-blob rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl [animation-delay:2s]"></div>
          <div className="absolute -bottom-8 left-20 h-72 w-72 animate-blob rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl [animation-delay:4s]"></div>
        </div>
      </div>
      <div className="fixed top-1/2 left-1/2 flex w-screen max-w-[28rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center space-y-4 overflow-hidden rounded-xl bg-zinc-800 p-6 text-left align-middle shadow-xl">
        <h1 className="text-4xl font-bold">Sign In</h1>
        <Button fullWidth onClick={handleSignIn}>
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

SignIn.auth = false;

export default SignIn;
