import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import clsx from "clsx";
import format from "date-fns/format";
import { useGetDeployment, useGetDeploymentEvents } from "services";

import { Button, PageTitle, Sidebar, Tab } from "@atoms";
import { HeaderLayout } from "@templates";

const Deployment = (): JSX.Element => {
  const router = useRouter();
  const { deploymentId } = router.query;

  const codeDivRef = useRef<HTMLDivElement>(null);

  const { deployment } = useGetDeployment(
    typeof deploymentId === "string" ? deploymentId : undefined
  );
  const { events } = useGetDeploymentEvents(
    typeof deploymentId === "string" ? deploymentId : undefined
  );

  useEffect(() => {
    if (codeDivRef.current) {
      const scroll = codeDivRef.current.scrollHeight;

      codeDivRef.current.scrollTop = scroll;
    }
  }, [events]);

  const OverviewView = (
    <div>
      <h2 className="text-2xl font-bold">Deployment Status</h2>
      <div
        ref={codeDivRef}
        className="overflow-y-scroll p-4 mt-4 max-h-[75vh] text-xs bg-zinc-900 rounded"
      >
        <code className="space-y-1.5 font-roboto-mono whitespace-pre-wrap">
          {events?.map((event) => {
            const [hms, ms] = format(
              new Date(event.exportedAt),
              "HH:mm:ss.SSS"
            ).split(".");

            return (
              <div key={event.id} className="flex gap-x-4 ">
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
