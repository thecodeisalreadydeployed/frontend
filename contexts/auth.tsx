import { useSession } from "next-auth/react";

interface AuthProps {
  children: JSX.Element;
}

export const Auth = (props: AuthProps): JSX.Element => {
  const { children } = props;

  const { data: session } = useSession({ required: true });

  const isUser = !!session?.user;

  if (isUser) {
    return children;
  }

  return <div>Loading...</div>;
};
