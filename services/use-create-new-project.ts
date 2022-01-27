import { useSWRConfig } from "swr";

import type { CreateProjectRequest } from "types/schema";

export const useCreateNewProject = (): {
  createNewProject: typeof createNewProject;
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
