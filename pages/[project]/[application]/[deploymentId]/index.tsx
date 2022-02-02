import { useRouter } from "next/router";

import { useGetDeployment, useGetDeploymentEvents } from "services";

import { Button, PageTitle, Sidebar, Tab } from "@atoms";
import { HeaderLayout } from "@templates";

const Deployment = (): JSX.Element => {
  const router = useRouter();
  const { deploymentId } = router.query;

  const { deployment } = useGetDeployment(
    typeof deploymentId === "string" ? deploymentId : undefined
  );
  const { events } = useGetDeploymentEvents(
    typeof deploymentId === "string" ? deploymentId : undefined
  );

  const OverviewView = (
    <div>
      <h2 className="text-2xl font-bold">Deployment Status</h2>
      <div className="p-4 font-roboto-mono text-sm bg-zinc-900 rounded">
        <code className="whitespace-pre-wrap">
          {events?.map((event) => {
            return <p key={event.id}>{event.text}</p>;
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
