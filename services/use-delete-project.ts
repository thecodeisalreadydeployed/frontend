import { useSWRConfig } from "swr";

export const useDeleteProject = (): {
  deleteProject: typeof deleteProject;
} => {
  const { mutate } = useSWRConfig();

  const deleteProject = async (projectId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/projects/${projectId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    mutate(`${process.env.NEXT_PUBLIC_HOST}/projects/list`);

    return response;
  };

  return {
    deleteProject,
  };
};
