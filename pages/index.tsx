import { useState } from "react";
import { HeaderLayout } from "@templates";
import { Input, Button } from "@atoms";
import { ProjectCard } from "@molecules";
import { useRouter } from "next/router";
import useSWR from "swr";

const Project = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  // NOTE: - Move localhost to env
  const { data: projects } = useSWR("http://localhost:3001/project/list");

  return (
    <div className="container mt-6">
      <div className="flex mb-6 space-x-4">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          width="w-full"
        />
        <Button wrapperOverride="flex-shrink-0">New Project</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects
          ?.filter(
            (project: { name: string; updated_at: string; id: string }) =>
              project.name.toLocaleLowerCase().includes(searchInput)
          )
          .map(
            (
              project: { name: string; updated_at: string; id: string },
              index: number
            ) => (
              <ProjectCard
                name={project.name}
                updatedAt={project.updated_at}
                key={index}
                onClick={() => router.push(`/${project.id}`)}
              />
            )
          )}
      </div>
    </div>
  );
};

Project.getLayout = HeaderLayout;

export default Project;
