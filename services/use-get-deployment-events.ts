import useSWR from "swr";

import type { Event } from "types/schema";

export const useGetDeploymentEvents = (
  deploymentId: string | undefined
): {
  events: Event[] | undefined;
  getEventsError: unknown;
  getEventsIsValidating: boolean;
} => {
  const { data, error, isValidating } = useSWR<Event[]>(
    deploymentId &&
      `${process.env.NEXT_PUBLIC_HOST}/deployments/${deploymentId}/events`,
    { refreshInterval: 1000 }
  );

  return {
    events: data,
    getEventsError: error,
    getEventsIsValidating: isValidating,
  };
};
