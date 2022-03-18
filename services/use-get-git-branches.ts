import { useState } from "react";

import { useSession } from "contexts";

import type { GetBranchesRequest } from "types/schema";

export const useGetGitBranches = (
  url: string
): {
  gitBranches: string[] | undefined;
} => {
  const [data, setData] = useState<string[] | undefined>();

  const { user } = useSession();

  const getGitBranches = async () => {
    const parameter: GetBranchesRequest = {
      URL: url,
    };

    const idToken = await user?.getIdToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/gitapi/branches`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + idToken,
        },
        body: JSON.stringify(parameter),
      }
    )
      .then((response) => response.json() as Promise<string[]>)
      .then((response) => setData(response));

    return response;
  };

  getGitBranches();

  return {
    gitBranches: data,
  };
};
