import { useEffect } from "react";
import { useRouter } from "next/router";

import { useSession } from "contexts";

interface AuthProps {
  children: JSX.Element;
  hasAuth: boolean;
}

export const Auth = (props: AuthProps): JSX.Element => {
  const { children, hasAuth } = props;

  const router = useRouter();

  const { user } = useSession();

  useEffect(() => {
    if (user === null && hasAuth) {
      router.push("/sign-in");
    }
  }, [hasAuth, router, user]);

  if (!hasAuth || user) {
    return children;
  }

  return <div />;
};
