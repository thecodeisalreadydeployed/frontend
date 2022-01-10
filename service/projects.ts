import { useSWRConfig } from "swr";

export const useCreateNewProject = (): {
  createNewProject: (name: string) => Promise<Response>;
} => {
  const { mutate } = useSWRConfig();

  const createNewProject = async (name: string) => {
    const project = {
      name,
    };

    const response = await fetch("http://localhost:3001/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(project),
    });

    mutate("http://localhost:3001/projects/list");

    return response;
  };

  return {
    createNewProject,
  };
};
