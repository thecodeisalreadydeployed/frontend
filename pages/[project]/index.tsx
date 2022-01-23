import { useState } from "react";
import { useRouter } from "next/router";

import { formatDistanceToNowStrict } from "date-fns";
import { useGetProjectApplications } from "services";

import { Button, Input, PageTitle } from "@atoms";
import { ProjectCard } from "@molecules";
import { CreateApplicationModal } from "@organisms";
import { HeaderLayout } from "@templates";

const Application = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const [showCreateApplicationModal, setShowCreateApplicationModal] =
    useState(false);

  const router = useRouter();

  const { project: projectId } = router.query;

  const { applications } = useGetProjectApplications(
    typeof projectId === "string" ? projectId : undefined
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
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button onClick={handleCreateNewApplication}>New Application</Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {applications
          ?.filter((application) =>
            application.name.toLocaleLowerCase().includes(searchInput)
          )
          .sort((a, b) => {
            return (
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
            );
          })
          .map((application, index) => (
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
};

Application.getLayout = HeaderLayout;

export default Application;
