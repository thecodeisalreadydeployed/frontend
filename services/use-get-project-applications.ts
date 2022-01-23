import useSWR from "swr";

import type { App } from "types/schema/model";

export const useGetProjectApplications = (
  projectId: string | undefined
): {
  applications: App[] | undefined;
  getProjectsError: unknown;
  getProjectsIsValidating: boolean;
} => {
  const { data, error, isValidating } = useSWR<App[]>(
    projectId && `${process.env.NEXT_PUBLIC_HOST}/projects/${projectId}/apps`
  );

  return {
    applications: data,
    getProjectsError: error,
    getProjectsIsValidating: isValidating,
  };
};
