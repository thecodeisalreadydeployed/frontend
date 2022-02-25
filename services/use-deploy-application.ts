import { useSession } from "contexts";
import { useSWRConfig } from "swr";

export const useDeployApplication = (): {
  deployApplication: typeof deployApplication;
} => {
  const { mutate } = useSWRConfig();
  const { user } = useSession();

  const deployApplication = async (applicationId: string) => {
    const idToken = await user?.getIdToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/apps/${applicationId}/deployments`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + idToken,
        },
      }
    );
    mutate(`${process.env.NEXT_PUBLIC_HOST}/apps/${applicationId}/deployments`);

    return response;
  };

  return {
    deployApplication,
  };
};
