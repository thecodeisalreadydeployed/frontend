import { SWRConfig } from "swr";
import type { BareFetcher } from "swr/dist/types";

const path = `${process.env.NEXTAUTH_URL ?? ""}/api/auth/jwt`;

const fetcher: BareFetcher<unknown> = async (resource, init) => {
  const token = await fetch(path).then((res) => res.json());

  return fetch(resource, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};

interface SWRConfigContextProps {
  children: React.ReactNode;
}

export const SWRConfigContext = ({
  children,
}: SWRConfigContextProps): JSX.Element => {
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>;
};
