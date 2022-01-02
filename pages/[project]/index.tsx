import { useState } from "react";
import { useRouter } from "next/router";

import { formatDistanceToNow } from "date-fns";
import useSWR from "swr";

import { Button, Input, PageTitle } from "@atoms";
import { ProjectCard } from "@molecules";
import { CreateApplicationModal } from "@organisms";
import { HeaderLayout } from "@templates";
import { App } from "types/api-schema";

const Application = () => {
  const [searchInput, setSearchInput] = useState("");
  const [showCreateApplicationModal, setShowCreateApplicationModal] =
    useState(false);

  const router = useRouter();

  const { project: projectId } = router.query;

  const { data: applications } = useSWR<App[]>(
    projectId ? `http://localhost:3001/projects/${projectId}/apps` : null
  );

  const handleCreateNewApplication = () => {
    setShowCreateApplicationModal(true);
  };

  const handleCloseApplicationModal = () => {
    setShowCreateApplicationModal(false);
  };

  return (
    <div className="container mt-6">
      <PageTitle>Applications</PageTitle>
      <div className="flex mb-6 space-x-4">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
        />
        <Button wrapperOverride="shrink-0" onClick={handleCreateNewApplication}>
          New Application
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {applications
          ?.filter((application) =>
            application.name.toLocaleLowerCase().includes(searchInput)
          )
          .map((application, index) => (
            <ProjectCard
              name={application.name}
              updatedAt={formatDistanceToNow(new Date(application.updatedAt), {
                addSuffix: true,
              })}
              key={index}
              onClick={() => router.push(`/${projectId}/${application.id}`)}
            />
          ))}
      </div>
      <CreateApplicationModal
        showModal={showCreateApplicationModal}
        onClose={handleCloseApplicationModal}
      />
    </div>
  );
};

Application.getLayout = HeaderLayout;

export default Application;
