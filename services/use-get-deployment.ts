import useSWR, { KeyedMutator, SWRConfiguration } from "swr";

import type { Deployment } from "types/schema";

export const useGetDeployment = (
  deploymentId: string | undefined,
  config?: SWRConfiguration
): {
  deployment: Deployment | undefined;
  getDeploymentError: unknown;
  getDeploymentIsValidating: boolean;
  mutateDeployment: KeyedMutator<Deployment>;
} => {
  const { data, error, isValidating, mutate } = useSWR<Deployment>(
    deploymentId &&
      `${process.env.NEXT_PUBLIC_HOST}/deployments/${deploymentId}`,
    config
  );

  return {
    deployment: data,
    getDeploymentError: error,
    getDeploymentIsValidating: isValidating,
    mutateDeployment: mutate,
  };
};
