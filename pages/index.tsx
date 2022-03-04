import { useMemo, useState } from "react";
import { useRouter } from "next/router";

import { formatDistanceToNowStrict } from "date-fns";
import { useGetProjects } from "services";

import { Button, Input, PageTitle } from "@atoms";
import { ProjectCard } from "@molecules";
import { CreateProjectModal } from "@organisms";
import { HeaderLayout } from "@templates";

const Project = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const router = useRouter();

  const { projects } = useGetProjects();

  const handleCloseProjectModal = () => {
    setShowCreateProjectModal(false);
  };
  const handleOpenProjectModal = () => {
    setShowCreateProjectModal(true);
  };

  const modifiedProjects = useMemo(
    () =>
      projects
        ?.filter((project) =>
          project.name.toLocaleLowerCase().includes(searchInput)
        )
        ?.sort((a, b) => {
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        }),
    [projects, searchInput]
  );

  return (
    <div className="container mt-6">
      <PageTitle>Projects</PageTitle>
      <div className="mb-6 flex space-x-4">
        <Input
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <Button onClick={handleOpenProjectModal}>New Project</Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modifiedProjects?.map((project, index) => (
          <ProjectCard
            key={index}
            name={project.name}
            projectId={project.id}
            updatedAt={`${formatDistanceToNowStrict(
              new Date(project.updatedAt)
            )} ago`}
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
