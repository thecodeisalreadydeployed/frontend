import { useState } from "react";
import { useRouter } from "next/router";

import { formatDistanceToNowStrict } from "date-fns";
import useSWR from "swr";

import { Button, Input, PageTitle } from "@atoms";
import { ProjectCard } from "@molecules";
import { CreateProjectModal } from "@organisms";
import { HeaderLayout } from "@templates";
import { Project as FetchedProject } from "types/api-schema";

const Project = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const router = useRouter();

  // NOTE: - Move localhost to env
  const { data: projects } = useSWR<FetchedProject[]>(
    "http://localhost:3001/projects/list"
  );

  const handleCloseProjectModal = () => {
    setShowCreateProjectModal(false);
  };
  const handleOpenProjectModal = () => {
    setShowCreateProjectModal(true);
  };

  return (
    <div className="container mt-6">
      <PageTitle>Projects</PageTitle>
      <div className="flex mb-6 space-x-4">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
        />
        <Button onClick={handleOpenProjectModal}>New Project</Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {projects
          ?.filter((project: FetchedProject) =>
            project.name.toLocaleLowerCase().includes(searchInput)
          )
          .sort((a, b) => {
            return (
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
            );
          })
          .map((project, index) => (
            <ProjectCard
              projectId={project.id}
              name={project.name}
              updatedAt={`${formatDistanceToNowStrict(
                new Date(project.updatedAt)
              )} ago`}
              key={index}
              onClick={() => router.push(`/${project.id}`)}
            />
          ))}
      </div>
      <CreateProjectModal
        showModal={showCreateProjectModal}
        onClose={handleCloseProjectModal}
      />
    </div>
  );
};

Project.getLayout = HeaderLayout;

export default Project;
