import useSWR from "swr";

import type { App } from "types/schema/model";

export const useGetProjectApplications = (
  projectId: string | undefined
): {
  applications: App[] | undefined;
  getProjectApplicationError: unknown;
  getProjectApplicationIsValidating: boolean;
} => {
  const { data, error, isValidating } = useSWR<App[]>(
    projectId && `${process.env.NEXT_PUBLIC_HOST}/projects/${projectId}/apps`
  );

  return {
    applications: data,
    getProjectApplicationError: error,
    getProjectApplicationIsValidating: isValidating,
  };
};
