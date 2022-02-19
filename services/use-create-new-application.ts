import { useSession } from "contexts";
import { useSWRConfig } from "swr";

import type { CreateAppRequest } from "types/schema";

interface createNewApplicationProps {
  branch: string;
  name: string;
  projectId: string;
  repositoryURL: string;
  buildScript: string;
}

export const useCreateNewApplication = (): {
  createNewApplication: typeof createNewApplication;
} => {
  const { mutate } = useSWRConfig();
  const { user } = useSession();

  const createNewApplication = async (
    parameters: createNewApplicationProps
  ) => {
    const { branch, buildScript, name, projectId, repositoryURL } = parameters;

    const application: CreateAppRequest = {
      branch: branch,
      buildScript: buildScript,
      name: name,
      projectID: projectId,
      repositoryURL: repositoryURL,
    };

    const idToken = await user?.getIdToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/apps`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        Authorization: "Bearer " + idToken,
      },
      body: JSON.stringify(application),
    });

    mutate(`${process.env.NEXT_PUBLIC_HOST}/projects/${projectId}/apps`);

    return response;
  };

  return {
    createNewApplication,
  };
};
