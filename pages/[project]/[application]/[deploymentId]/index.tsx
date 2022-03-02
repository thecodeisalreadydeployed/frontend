import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { ChevronDoubleDownIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import format from "date-fns/format";
import { useScroll } from "hooks";
import { useGetDeployment, useGetDeploymentEvents } from "services";
import { mapDeploymentStateTitle } from "utils";

import { Button, PageTitle, Sidebar, Tab } from "@atoms";
import { HeaderLayout } from "@templates";
import { DeploymentState } from "types/schema";

const Deployment = (): JSX.Element => {
  const router = useRouter();
  const { deploymentId } = router.query;

  const codeDivRef = useRef<HTMLDivElement>(null);
  const shouldAutoScroll = useRef(false);

  const { deployment } = useGetDeployment(
    typeof deploymentId === "string" ? deploymentId : undefined
  );
  const { events } = useGetDeploymentEvents(
    typeof deploymentId === "string" ? deploymentId : undefined
  );

  const scroll = useScroll();

  useEffect(() => {
    if (scroll.direction === "up") {
      shouldAutoScroll.current = false;
    }
  }, [scroll]);

  useEffect(() => {
    if (codeDivRef.current && shouldAutoScroll.current === true) {
      codeDivRef.current.scrollIntoView({ block: "end" });
    }
  }, [events]);

  const OverviewView = (
    <div>
      <h2 className="text-2xl font-bold">Deployment Status</h2>
      <div ref={codeDivRef} className=" mt-4 text-sm bg-zinc-900 rounded">
        <div className="flex sticky top-0 justify-between items-center px-4 h-16 bg-zinc-700 rounded-t">
          <p className="text-lg font-bold">
            {deployment?.state && mapDeploymentStateTitle(deployment?.state)}
          </p>
          <div className="flex items-center space-x-2">
            {deployment?.state === DeploymentState.DeploymentStateReady && (
              <Button
                size="sm"
                onClick={() =>
                  router.push(`https://${deployment?.appID}.svc.deploys.dev`)
                }
              >
                Open
              </Button>
            )}

            <Button
              size="sm"
              type="outline"
              onClick={() => {
                if (codeDivRef.current) {
                  codeDivRef.current.scrollIntoView({ block: "end" });
                }

                shouldAutoScroll.current = true;
              }}
            >
              <ChevronDoubleDownIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>
        <code className="font-mono whitespace-pre-wrap">
          {events?.map((event) => {
            const [hms, ms] = format(
              new Date(event.exportedAt),
              "HH:mm:ss.SSS"
            ).split(".");

            return (
              <div
                key={event.id}
                className="flex gap-x-4 py-1 px-4 hover:bg-zinc-800/50"
              >
                <span className="shrink-0">
                  <span>{hms}</span>.<span className="text-zinc-400">{ms}</span>
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
      </div>
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
