import { useSession } from "contexts";
import { SWRConfig } from "swr";
import type { BareFetcher } from "swr/dist/types";
interface SWRConfigContextProps {
  children: React.ReactNode;
}

export const SWRConfigContext = ({
  children,
}: SWRConfigContextProps): JSX.Element => {
  const { user } = useSession();

  const fetcher: BareFetcher<unknown> = async (resource, init) => {
    const idToken = await user?.getIdToken();
    if (idToken && resource)
      return fetch(resource, {
        ...init,
        headers: {
          ...init?.headers,
          Authorization: "Bearer " + idToken,
        },
      }).then((res) => res.json());
    else return Promise.reject(new Error("User is not authenticated"));
  };

  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
