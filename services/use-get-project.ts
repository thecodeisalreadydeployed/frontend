import useSWR, { KeyedMutator, SWRConfiguration } from "swr";

import type { Project } from "types/schema";

export const useGetProject = (
  projectId: string | undefined,
  config?: SWRConfiguration
): {
  project: Project | undefined;
  getProjectError: unknown;
  getProjectIsValidating: boolean;
  mutateProject: KeyedMutator<Project>;
} => {
  const { data, error, isValidating, mutate } = useSWR<Project>(
    projectId && `${process.env.NEXT_PUBLIC_HOST}/projects/${projectId}`,
    config
  );

  return {
    project: data,
    getProjectError: error,
    getProjectIsValidating: isValidating,
    mutateProject: mutate,
  };
};
