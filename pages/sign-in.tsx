import { useState } from "react";
import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getCsrfToken,
  getProviders,
  getSession,
  LiteralUnion,
  signIn,
} from "next-auth/react";

import { Button, Input } from "@atoms";

enum ID {
  EMAIL_INPUT = "email-input",
  PASSWORD_INPUT = "password-input",
}

interface SignInProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}
const SignIn = (props: SignInProps): JSX.Element => {
  const { providers } = props;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    switch (id) {
      case ID.EMAIL_INPUT:
        setEmail(value);
        break;
      case ID.PASSWORD_INPUT:
        setPassword(value);
        break;
    }
  };

  const handleSignIn = () => {
    if (!providers.credentials.id) return;

    signIn(providers.credentials.id, {
      email,
      password,
    });
  };

  return (
    <div className="w-screen h-screen bg-zinc-600">
      <div className="flex justify-center items-center px-16 min-h-screen">
        <div className="relative w-full max-w-lg">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full opacity-70 mix-blend-multiply blur-xl animate-blob"></div>
          <div className="[animation-delay:2s] absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full opacity-70 mix-blend-multiply blur-xl animate-blob"></div>
          <div className="[animation-delay:4s] absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full opacity-70 mix-blend-multiply blur-xl animate-blob"></div>
        </div>
      </div>
      <div className="flex overflow-hidden fixed top-1/2 left-1/2 flex-col items-center p-6 space-y-4 w-screen max-w-[28rem] text-left align-middle bg-zinc-800 rounded-xl shadow-xl -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-4xl font-bold">Sign In</h1>
        <div className="space-y-2 w-full">
          <div>
            <label className="block mb-1 text-sm" htmlFor={ID.EMAIL_INPUT}>
              Email
            </label>
            <Input
              id={ID.EMAIL_INPUT}
              value={email}
              onChange={handleInputChange}
            ></Input>
          </div>
          <div>
            <label className="block mb-1 text-sm" htmlFor={ID.PASSWORD_INPUT}>
              Password
            </label>
            <Input
              id={ID.PASSWORD_INPUT}
              type="password"
              value={password}
              onChange={handleInputChange}
            ></Input>
          </div>
        </div>
        <Button fullWidth onClick={handleSignIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
      props: {},
    };
  }
  return {
    props: {
      providers: await getProviders(),
      csrfToken: await getCsrfToken(),
    },
  };
};

SignIn.auth = false;

export default SignIn;
