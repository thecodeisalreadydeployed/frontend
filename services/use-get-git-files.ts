import { useCallback, useState } from "react";

import { useSession } from "contexts";

import type { GetFilesRequest } from "types/schema";

export const useGetGitFiles = (
  defaultUrl?: string
): {
  getGitFiles: (branch: string, url?: string) => void;
  gitFiles: string[] | undefined;
} => {
  const [data, setData] = useState<string[] | undefined>();

  const { user } = useSession();

  const getGitFiles = useCallback(
    async (branch: string, url?: string) => {
      const parameter: GetFilesRequest = {
        Branch: branch,
        URL: url ?? defaultUrl ?? "",
      };

      const idToken = await user?.getIdToken();

      await fetch(`${process.env.NEXT_PUBLIC_HOST}/gitapi/files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + idToken,
        },
        body: JSON.stringify(parameter),
      })
        .then((response) => response.json() as Promise<string[]>)
        .then((response) => setData(response))
        .catch(() => setData(undefined));
    },
    [defaultUrl, user]
  );

  return { getGitFiles, gitFiles: data };
};
