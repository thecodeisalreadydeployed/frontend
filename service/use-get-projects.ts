import useSWR from "swr";

import type { Project } from "types/schema";

export const useGetProjects = (): {
  projects: Project[] | undefined;
  getProjectsError: unknown;
  getProjectsIsValidating: boolean;
} => {
  const { data, error, isValidating } = useSWR<Project[]>(
    `${process.env.NEXT_PUBLIC_HOST}/projects/list`
  );

  return {
    projects: data,
    getProjectsError: error,
    getProjectsIsValidating: isValidating,
  };
};
