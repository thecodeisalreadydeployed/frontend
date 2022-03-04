import useSWR, { KeyedMutator, SWRConfiguration } from "swr";

import type { Project } from "types/schema";

export const useGetProjects = (
  config?: SWRConfiguration
): {
  projects: Project[] | undefined;
  getProjectsError: unknown;
  getProjectsIsValidating: boolean;
  mutateProjects: KeyedMutator<Project[]>;
} => {
  const { data, error, isValidating, mutate } = useSWR<Project[]>(
    `${process.env.NEXT_PUBLIC_HOST}/projects/list`,
    config
  );

  return {
    projects: data,
    getProjectsError: error,
    getProjectsIsValidating: isValidating,
    mutateProjects: mutate,
  };
};
