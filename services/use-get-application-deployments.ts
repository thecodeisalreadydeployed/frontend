import useSWR, { KeyedMutator, SWRConfiguration } from "swr";

import type { Deployment } from "types/schema";

export const useGetApplicationDeployments = (
  applicationId: string | undefined,
  config?: SWRConfiguration
): {
  deployments: Deployment[] | undefined;
  getDeploymentsError: unknown;
  getDeploymentsIsValidating: boolean;
  mutateDeployments: KeyedMutator<Deployment[]>;
} => {
  const { data, error, isValidating, mutate } = useSWR<Deployment[]>(
    applicationId &&
      `${process.env.NEXT_PUBLIC_HOST}/apps/${applicationId}/deployments`,
    config
  );

  return {
    deployments: data,
    getDeploymentsError: error,
    getDeploymentsIsValidating: isValidating,
    mutateDeployments: mutate,
  };
};
