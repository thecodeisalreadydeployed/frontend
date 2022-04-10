import { useMemo, useState } from "react";
import { useRouter } from "next/router";

import { formatDistanceToNowStrict } from "date-fns";
import Fuse from "fuse.js";
import { useDebounce } from "hooks";
import { useGetProjects } from "services";

import { Button, Input, PageTitle } from "@atoms";
import { ProjectCard } from "@molecules";
import { CreateProjectModal } from "@organisms";
import { HeaderLayout } from "@templates";

const Project = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const router = useRouter();

  const { projects } = useGetProjects();

  const handleCloseProjectModal = () => {
    setShowCreateProjectModal(false);
  };
  const handleOpenProjectModal = () => {
    setShowCreateProjectModal(true);
  };

  const modifiedProjects = useMemo(() => {
    if (!projects) {
      return undefined;
    }

    if (!debouncedSearchInput) {
      return projects?.sort((a, b) => {
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      });
    }

    const fuse = new Fuse(projects, { keys: ["name"] });

    return fuse.search(debouncedSearchInput).map((result) => result.item);
  }, [projects, debouncedSearchInput]);

  return (
    <div className="container mt-6">
      <div className="flex justify-between">
        <PageTitle>Applications</PageTitle>
        <div className="max-w-md flex-1">
          <Input
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-6 flex justify-end">
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
