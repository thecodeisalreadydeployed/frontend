import { useSession } from "next-auth/react";

import { SWRConfig } from "swr";
import type { BareFetcher } from "swr/dist/types";

interface SWRConfigContextProps {
  children: React.ReactNode;
}

export const SWRConfigContext = ({
  children,
}: SWRConfigContextProps): JSX.Element => {
  const { data: session } = useSession({ required: true });

  const token = session?.accessToken;

  const fetcher: BareFetcher<unknown> = (resource, init) =>
    fetch(resource, {
      ...init,
      headers: {
        ...init?.headers,
        Authorization: "Bearer " + token,
      },
    }).then((res) => res.json());

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
