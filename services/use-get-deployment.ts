import useSWR from "swr";

import type { Deployment } from "types/schema";

export const useGetDeployment = (
  deploymentId: string | undefined
): {
  deployment: Deployment | undefined;
  getDeploymentError: unknown;
  getDeploymentIsValidating: boolean;
} => {
  const { data, error, isValidating } = useSWR<Deployment>(
    deploymentId &&
      `${process.env.NEXT_PUBLIC_HOST}/deployments/${deploymentId}`
  );

  return {
    deployment: data,
    getDeploymentError: error,
    getDeploymentIsValidating: isValidating,
  };
};
