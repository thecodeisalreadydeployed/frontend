import { useCallback, useState } from "react";

import { useSession } from "contexts";

import type { GetBranchesRequest } from "types/schema";

export const useGetGitBranches = (
  defaultUrl?: string
): {
  getGitBranches: (url?: string) => void;
  gitBranches: string[] | undefined;
} => {
  const [data, setData] = useState<string[] | undefined>();

  const { user } = useSession();

  const getGitBranches = useCallback(
    async (url?: string) => {
      const parameter: GetBranchesRequest = {
        URL: url ?? defaultUrl ?? "",
      };

      const idToken = await user?.getIdToken();

      await fetch(`${process.env.NEXT_PUBLIC_HOST}/gitapi/branches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + idToken,
        },
        body: JSON.stringify(parameter),
      })
        .then((response) => response.json() as Promise<string[]>)
        .then((response) => setData(response))
        .catch((error) => console.error(error));
    },
    [defaultUrl, user]
  );

  return { getGitBranches, gitBranches: data };
};
