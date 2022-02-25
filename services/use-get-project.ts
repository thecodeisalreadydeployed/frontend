import useSWR from "swr";

import type { Project } from "types/schema";

export const useGetProject = (
  projectId: string
): {
  project: Project | undefined;
  getProjectError: unknown;
  getProjectIsValidating: boolean;
} => {
  const { data, error, isValidating } = useSWR<Project>(
    `${process.env.NEXT_PUBLIC_HOST}/projects/${projectId}`
  );

  return {
    project: data,
    getProjectError: error,
    getProjectIsValidating: isValidating,
  };
};
