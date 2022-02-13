import { SWRConfig } from "swr";
import type { BareFetcher } from "swr/dist/types";

const fetcher: BareFetcher<unknown> = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

interface SWRConfigContextProps {
  children: React.ReactNode;
}

export const SWRConfigContext = ({
  children,
}: SWRConfigContextProps): JSX.Element => (
  <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
);
