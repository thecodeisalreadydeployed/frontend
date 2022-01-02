import { SWRConfig } from "swr";
import type { BareFetcher } from "swr/dist/types";

const fetcher: BareFetcher<unknown> = (resource, init) =>
  fetch(resource, init).then((res) => res.json());

interface SWRConfigValueProps {
  children: React.ReactNode;
}

export const SWRConfigValue = ({
  children,
}: SWRConfigValueProps): JSX.Element => (
  <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
);
