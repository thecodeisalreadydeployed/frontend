import { useMemo, useState } from "react";
import { useRouter } from "next/router";

import { formatDistanceToNowStrict } from "date-fns";
import Fuse from "fuse.js";
import { useDebounce } from "hooks";
import { useDeleteProject, useGetProjectApplications } from "services";

import { Button, Input, PageTitle, Sidebar, Tab } from "@atoms";
import { ProjectCard } from "@molecules";
import { CreateApplicationModal } from "@organisms";
import { HeaderLayout } from "@templates";

const Application = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput);
  const [showCreateApplicationModal, setShowCreateApplicationModal] =
    useState(false);

  const router = useRouter();

  const { project: projectId } = router.query;

  const { applications } = useGetProjectApplications(
    typeof projectId === "string" ? projectId : undefined
  );
  const { deleteProject } = useDeleteProject();

  const handleCreateNewApplication = () => {
    setShowCreateApplicationModal(true);
  };

  const handleCloseApplicationModal = () => {
    setShowCreateApplicationModal(false);
  };

  const modifiedApplications = useMemo(() => {
    if (!applications) {
      return undefined;
    }

    if (!debouncedSearchInput) {
      return applications?.sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
    }

    const fuse = new Fuse(applications, { keys: ["name"] });

    return fuse.search(debouncedSearchInput).map((result) => result.item);
  }, [applications, debouncedSearchInput]);

  const OverviewView = (
    <div>
      <div className="mb-6 flex justify-between space-x-4">
        <div className="max-w-md flex-1">
          <Input
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Button onClick={handleCreateNewApplication}>New Application</Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modifiedApplications?.map((application, index) => (
          <ProjectCard
            key={index}
            name={application.name}
            projectId={application.id}
            updatedAt={`${formatDistanceToNowStrict(
              new Date(application.updatedAt)
            )} ago`}
            onClick={() => router.push(`/${projectId}/${application.id}`)}
          />
        ))}
      </div>
      {typeof projectId === "string" && projectId && (
        <CreateApplicationModal
          projectId={projectId}
          showModal={showCreateApplicationModal}
          onClose={handleCloseApplicationModal}
        />
      )}
    </div>
  );

  const SettingGeneralView = (
    <div className="space-y-3.5">
      <p className="text-lg font-bold text-red-400">Delete Project</p>
      <p>
        The project, including all of its applications and deployments, will be
        permanently removed.
      </p>
      <Button
        color="danger"
        onClick={() => {
          if (typeof projectId === "string" && projectId) {
            deleteProject(projectId);
            router.replace("/");
          }
        }}
      >
        Delete Project
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
      <PageTitle>Applications</PageTitle>
      <Tab
        tabs={[
          { name: "Overview", panel: OverviewView },
          { name: "Settings", panel: SettingsView },
        ]}
      />
    </div>
  );
};

Application.getLayout = HeaderLayout;

export default Application;
