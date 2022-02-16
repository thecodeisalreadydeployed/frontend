import { useEffect } from "react";
import { useRouter } from "next/router";

import { useSession } from "contexts";

interface AuthProps {
  children: JSX.Element;
}

export const Auth = (props: AuthProps): JSX.Element => {
  const { children } = props;

  const router = useRouter();

  const { user } = useSession();

  useEffect(() => {
    if (user === null) {
      router.push("/sign-in");
    }
  }, [router, user]);

  if (user) {
    return children;
  }

  return <div />;
};
