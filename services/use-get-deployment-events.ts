import useSWR, { KeyedMutator, SWRConfiguration } from "swr";

import type { Event } from "types/schema";

export const useGetDeploymentEvents = (
  deploymentId: string | undefined,
  config?: SWRConfiguration
): {
  events: Event[] | undefined;
  getEventsError: unknown;
  getEventsIsValidating: boolean;
  mutateEvents: KeyedMutator<Event[]>;
} => {
  const { data, error, isValidating, mutate } = useSWR<Event[]>(
    deploymentId &&
      `${process.env.NEXT_PUBLIC_HOST}/deployments/${deploymentId}/events`,
    config
  );

  return {
    events: data,
    getEventsError: error,
    getEventsIsValidating: isValidating,
    mutateEvents: mutate,
  };
};
