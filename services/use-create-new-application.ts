import { useSession } from "contexts";
import { useSWRConfig } from "swr";

import type { CreateAppRequest } from "types/schema";

interface createNewApplicationProps {
  branch: string;
  buildCommand: string;
  installCommand: string;
  name: string;
  outputDirectory: string;
  projectId: string;
  repositoryURL: string;
  startCommand: string;
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
    const {
      branch,
      buildCommand,
      buildScript,
      installCommand,
      name,
      outputDirectory,
      projectId,
      repositoryURL,
      startCommand,
    } = parameters;

    const application: CreateAppRequest = {
      Branch: branch,
      BuildCommand: buildCommand,
      BuildScript: buildScript,
      InstallCommand: installCommand,
      Name: name,
      OutputDirectory: outputDirectory,
      ProjectID: projectId,
      RepositoryURL: repositoryURL,
      StartCommand: startCommand,
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
