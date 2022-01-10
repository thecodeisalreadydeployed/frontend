import useSWR, { useSWRConfig } from "swr";

import type { CreateProjectRequest, Project } from "types/schema";

export const useCreateNewProject = (): {
  createNewProject: (name: string) => Promise<Response>;
} => {
  const { mutate } = useSWRConfig();

  const createNewProject = async (name: string) => {
    const project: CreateProjectRequest = {
      Name: name,
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(project),
    });

    mutate(`${process.env.NEXT_PUBLIC_HOST}/projects/list`);

    return response;
  };

  return {
    createNewProject,
  };
};

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
