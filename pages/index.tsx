import { useState } from "react";
import { HeaderLayout } from "@templates";
import { Input, Button, PageTitle } from "@atoms";
import { ProjectCard } from "@molecules";
import { Project as FetchedProject } from "@types_/api-schema";
import { useRouter } from "next/router";
import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";

const Project = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  // NOTE: - Move localhost to env
  const { data: projects } = useSWR<FetchedProject[]>(
    "http://localhost:3001/project/list"
  );

  return (
    <div className="container mt-6">
      <PageTitle>Projects</PageTitle>
      <div className="flex mb-6 space-x-4">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          width="w-full"
        />
        <Button wrapperOverride="shrink-0">New Project</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects
          ?.filter((project: FetchedProject) =>
            project.name.toLocaleLowerCase().includes(searchInput)
          )
          .map((project, index) => (
            <ProjectCard
              name={project.name}
              updatedAt={formatDistanceToNow(new Date(project.updatedAt), {
                addSuffix: true,
              })}
              key={index}
              onClick={() => router.push(`/${project.id}`)}
            />
          ))}
      </div>
    </div>
  );
};

Project.getLayout = HeaderLayout;

export default Project;
