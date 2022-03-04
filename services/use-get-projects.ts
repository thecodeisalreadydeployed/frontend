import useSWR, { KeyedMutator } from "swr";

import type { Project } from "types/schema";

export const useGetProjects = (): {
  projects: Project[] | undefined;
  getProjectsError: unknown;
  getProjectsIsValidating: boolean;
  mutateProjects: KeyedMutator<Project[]>;
} => {
  const { data, error, isValidating, mutate } = useSWR<Project[]>(
    `${process.env.NEXT_PUBLIC_HOST}/projects/list`
  );

  return {
    projects: data,
    getProjectsError: error,
    getProjectsIsValidating: isValidating,
    mutateProjects: mutate,
  };
};
