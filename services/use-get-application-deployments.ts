import useSWR from "swr";

import type { Deployment } from "types/schema";

export const useGetApplicationDeployments = (
  applicationId: string | undefined
): {
  deployments: Deployment[] | undefined;
  getDeploymentsError: unknown;
  getDeploymentsIsValidating: boolean;
} => {
  const { data, error, isValidating } = useSWR<Deployment[]>(
    applicationId &&
      `${process.env.NEXT_PUBLIC_HOST}/apps/${applicationId}/deployments`
  );

  return {
    deployments: data,
    getDeploymentsError: error,
    getDeploymentsIsValidating: isValidating,
  };
};
