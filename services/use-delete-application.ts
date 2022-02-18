import { useSession } from "contexts";
import { useSWRConfig } from "swr";

export const useDeleteApplication = (): {
  deleteApplication: typeof deleteApplication;
} => {
  const { mutate } = useSWRConfig();
  const { user } = useSession();

  const deleteApplication = async (
    applicationId: string,
    projectId: string | undefined
  ) => {
    const idToken = await user?.getIdToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/apps/${applicationId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + idToken,
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
