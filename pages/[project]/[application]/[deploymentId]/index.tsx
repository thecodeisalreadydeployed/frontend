import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { ExternalLinkIcon } from "@heroicons/react/outline";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/solid";
import clsx from "clsx";
import format from "date-fns/format";
import { useGetDeployment, useGetDeploymentEvents } from "services";
import { mapDeploymentStateTitle, throttle } from "utils";

import { AlienLoadingSplash, Button, PageTitle, Sidebar, Tab } from "@atoms";
import { HeaderLayout } from "@templates";
import { DeploymentState } from "types/schema";

const Deployment = (): JSX.Element => {
  const router = useRouter();
  const { deploymentId } = router.query;

  const paddingDivRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(true);

  const { deployment } = useGetDeployment(
    typeof deploymentId === "string" ? deploymentId : undefined,
    { refreshInterval: 1000 }
  );
  const { events } = useGetDeploymentEvents(
    typeof deploymentId === "string" ? deploymentId : undefined,
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    if (shouldAutoScroll.current) {
      paddingDivRef.current?.scrollIntoView({ block: "end" });
    }
  }, [events]);

  const removeAutoScrollthrottle = useMemo(
    () =>
      throttle(() => {
        shouldAutoScroll.current = false;
      }),
    []
  );

  const OverviewView = (
    <div
      onWheel={() => {
        removeAutoScrollthrottle();
      }}
    >
      <h2 className="text-2xl font-bold">Deployment Status</h2>
      <div className="mt-4 rounded-lg bg-zinc-900 text-sm">
        <div className="sticky top-0 flex h-14 items-center justify-between rounded-t-lg bg-zinc-700 px-4">
          <p className="text-lg font-bold">
            {deployment?.state && mapDeploymentStateTitle(deployment?.state)}
          </p>
          <div className="flex items-center space-x-2">
            {deployment?.state === DeploymentState.DeploymentStateReady && (
              <Link href={`https://${deployment.appID}.svc.deploys.dev`}>
                <a rel="noreferrer" target="_blank">
                  <Button size="sm">
                    <p>Open</p>
                    <ExternalLinkIcon className="ml-1 h-4 w-4" />
                  </Button>
                </a>
              </Link>
            )}

            <Button
              size="sm"
              type="outline"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <ChevronDoubleUpIcon className="h-6 w-6" />
            </Button>
            <Button
              size="sm"
              type="outline"
              onClick={() => {
                if (paddingDivRef.current) {
                  paddingDivRef.current.scrollIntoView({ block: "end" });
                }
                shouldAutoScroll.current = true;
              }}
            >
              <ChevronDoubleDownIcon className="h-6 w-6" />
            </Button>
          </div>
        </div>
        {events && events.length > 0 ? (
          <code className="block overflow-hidden whitespace-pre-wrap rounded-b-lg font-mono">
            {events?.map((event) => {
              const [hms, ms] = format(
                new Date(event.exportedAt),
                "HH:mm:ss.SSS"
              ).split(".");

              return (
                <div
                  key={event.id}
                  className="flex gap-x-4 bg-black py-1 px-4 hover:bg-zinc-800/50"
                >
                  <span className="shrink-0">
                    <span>{hms}</span>.
                    <span className="text-zinc-400">{ms}</span>
                  </span>
                  <span
                    className={clsx(
                      event.text.toLocaleLowerCase().includes("error") &&
                        "text-red-400"
                    )}
                  >
                    {event.text}
                  </span>
                </div>
              );
            })}
          </code>
        ) : (
          <div className="h-[20rem] p-6">
            <AlienLoadingSplash className="h-full w-full" />
          </div>
        )}
      </div>
      <div ref={paddingDivRef} className="h-6" />
    </div>
  );

  const SettingGeneralView = (
    <div className="space-y-3.5">
      <p className="text-lg font-bold text-red-400">Delete Deployment</p>
      <p>The deployement will be permanently removed.</p>
      <Button
        color="danger"
        onClick={() => {
          // if (typeof applicationId === "string" && applicationId) {
          //   const projectId = application?.projectID;
          //   deleteApplication(applicationId, projectId);
          //   router.replace(projectId ? `/${projectId}` : "/");
          // }
        }}
      >
        Delete Deployment
      </Button>
    </div>
  );
  const SettingsView = (
    <Sidebar
      menus={[
        { name: "General", panel: SettingGeneralView },
        { name: "Placeholder", panel: <div /> },
      ]}
    />
  );

  return (
    <div className="container mt-6">
      <PageTitle>{deployment?.gitSource.commitMessage}</PageTitle>
      <Tab
        tabs={[
          { name: "Overview", panel: OverviewView },
          { name: "Settings", panel: SettingsView },
        ]}
      />
    </div>
  );
};

Deployment.getLayout = HeaderLayout;

export default Deployment;
