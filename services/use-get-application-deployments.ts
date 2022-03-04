import useSWR, { KeyedMutator } from "swr";

import type { Deployment } from "types/schema";

export const useGetApplicationDeployments = (
  applicationId: string | undefined
): {
  deployments: Deployment[] | undefined;
  getDeploymentsError: unknown;
  getDeploymentsIsValidating: boolean;
  mutateDeployments: KeyedMutator<Deployment[]>;
} => {
  const { data, error, isValidating, mutate } = useSWR<Deployment[]>(
    applicationId &&
      `${process.env.NEXT_PUBLIC_HOST}/apps/${applicationId}/deployments`,
    { refreshInterval: 1000 }
  );

  return {
    deployments: data,
    getDeploymentsError: error,
    getDeploymentsIsValidating: isValidating,
    mutateDeployments: mutate,
  };
};
