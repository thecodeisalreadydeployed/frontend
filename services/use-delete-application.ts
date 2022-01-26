import { useSWRConfig } from "swr";

export const useDeleteApplication = (): {
  deleteApplication: typeof deleteApplication;
} => {
  const { mutate } = useSWRConfig();

  const deleteApplication = async (
    applicationId: string,
    projectId: string | undefined
  ) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/apps/${applicationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    if (projectId) {
      mutate(`${process.env.NEXT_PUBLIC_HOST}/projects/${projectId}/apps`);
    }

    return response;
  };

  return {
    deleteApplication,
  };
};
