import { useCallback, useState } from "react";

import { useSession } from "contexts";

import type { GetRawRequest } from "types/schema";

export const useGetGitRaw = (
  defaultUrl?: string
): {
  getGitRaw: (branch: string, path: string, url?: string) => void;
  gitRaw: string | undefined;
} => {
  const [data, setData] = useState<string | undefined>();

  const { user } = useSession();

  const getGitRaw = useCallback(
    async (branch: string, path: string, url?: string) => {
      const parameter: GetRawRequest = {
        Branch: branch,
        URL: url ?? defaultUrl ?? "",
        Path: path,
      };

      const idToken = await user?.getIdToken();

      await fetch(`${process.env.NEXT_PUBLIC_HOST}/gitapi/raw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: "Bearer " + idToken,
        },
        body: JSON.stringify(parameter),
      })
        .then((response) => response.text() as Promise<string>)
        .then((response) => setData(response))
        .catch(() => setData(undefined));
    },
    [defaultUrl, user]
  );

  return { getGitRaw, gitRaw: data };
};
