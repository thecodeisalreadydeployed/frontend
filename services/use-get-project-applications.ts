import useSWR, { KeyedMutator, SWRConfiguration } from "swr";

import type { App } from "types/schema/model";

export const useGetProjectApplications = (
  projectId: string | undefined,
  config?: SWRConfiguration
): {
  applications: App[] | undefined;
  getProjectApplicationError: unknown;
  getProjectApplicationIsValidating: boolean;
  mutateApplications: KeyedMutator<App[]>;
} => {
  const { data, error, isValidating, mutate } = useSWR<App[]>(
    projectId && `${process.env.NEXT_PUBLIC_HOST}/projects/${projectId}/apps`,
    config
  );

  return {
    applications: data,
    getProjectApplicationError: error,
    getProjectApplicationIsValidating: isValidating,
    mutateApplications: mutate,
  };
};
