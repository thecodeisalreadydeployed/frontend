import { useRouter } from "next/router";

import {
  useDeleteApplication,
  useDeployApplication,
  useGetApplication,
} from "services";

import { Button, PageTitle, Sidebar, Tab } from "@atoms";
import { DeploymentList } from "@organisms";
import { HeaderLayout } from "@templates";

const Overview = (): JSX.Element => {
  const router = useRouter();
  const { application: applicationId } = router.query;

  const { application } = useGetApplication(
    typeof applicationId === "string" ? applicationId : undefined
  );

  const { deleteApplication } = useDeleteApplication();

  const { deployApplication } = useDeployApplication();

  const handleOnClickDeploy = () => {
    if (application?.id) {
      deployApplication(application.id);
    }
  };

  const OverviewView = (
    <div>
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold">Deployments</h2>
          <p className="mt-3.5 text-sm text-zinc-400">
            Deployments that are currently being worked on.
          </p>
        </div>
        <div>
          <Button onClick={handleOnClickDeploy}>Deploy</Button>
        </div>
      </div>
      <DeploymentList applicationId={application?.id} />
    </div>
  );

  const SettingGeneralView = (
    <div className="space-y-3.5">
      <p className="text-lg font-bold text-red-400">Delete Application</p>
      <p>
        The application, including all of its deployments, will be permanently
        removed.
      </p>
      <Button
        color="danger"
        onClick={() => {
          if (typeof applicationId === "string" && applicationId) {
            const projectId = application?.projectID;
            deleteApplication(applicationId, projectId);
            router.replace(projectId ? `/${projectId}` : "/");
          }
        }}
      >
        Delete Application
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
      <PageTitle>{application?.name}</PageTitle>
      <Tab
        tabs={[
          { name: "Overview", panel: OverviewView },
          { name: "Settings", panel: SettingsView },
        ]}
      />
    </div>
  );
};

Overview.getLayout = HeaderLayout;

export default Overview;
