import useSWR, { KeyedMutator, SWRConfiguration } from "swr";

import type { App } from "types/schema";

export const useGetApplication = (
  applicationId: string | undefined,
  config?: SWRConfiguration
): {
  application: App | undefined;
  getApplicationError: unknown;
  getApplicationIsValidating: boolean;
  mutateApplication: KeyedMutator<App>;
} => {
  const { data, error, isValidating, mutate } = useSWR<App>(
    applicationId && `${process.env.NEXT_PUBLIC_HOST}/apps/${applicationId}`,
    config
  );

  return {
    application: data,
    getApplicationError: error,
    getApplicationIsValidating: isValidating,
    mutateApplication: mutate,
  };
};
