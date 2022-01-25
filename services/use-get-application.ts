import useSWR from "swr";

import type { App } from "types/schema";

export const useGetApplication = (
  applicationId: string | undefined
): {
  application: App | undefined;
  getApplicationError: unknown;
  getApplicationIsValidating: boolean;
} => {
  const { data, error, isValidating } = useSWR<App>(
    applicationId && `${process.env.NEXT_PUBLIC_HOST}/apps/${applicationId}`
  );

  return {
    application: data,
    getApplicationError: error,
    getApplicationIsValidating: isValidating,
  };
};
