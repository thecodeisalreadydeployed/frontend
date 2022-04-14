import { useMemo, useState } from "react";
import { useRouter } from "next/router";

import { PlusIcon } from "@heroicons/react/outline";
import { formatDistanceToNowStrict } from "date-fns";
import Fuse from "fuse.js";
import { useDebounce } from "hooks";
import { useGetProjects } from "services";

import { Input, PageTitle } from "@atoms";
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
        <PageTitle>Project</PageTitle>
        <div className="max-w-md flex-1">
          <Input
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          className="flex h-[8.5rem] w-[19.3125rem] cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-dashed border-zinc-600 bg-zinc-900 hover:bg-zinc-700"
          onClick={handleOpenProjectModal}
        >
          <PlusIcon className="h-6 w-6" />
          <p>New Project</p>
        </div>
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
