import { useState } from "react";
import { HeaderLayout } from "@templates";
import { Input, Button } from "@atoms";
import { ProjectCard } from "@molecules";
import { useRouter } from "next/router";

const Project = () => {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

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
        <ProjectCard
          name="Project 1"
          onClick={() => router.push("/project-1")}
        />
        <ProjectCard
          name="Project 2"
          onClick={() => router.push("/project-2")}
        />
        <ProjectCard
          name="Project 3"
          onClick={() => router.push("/project-3")}
        />
        <ProjectCard
          name="Project 4"
          onClick={() => router.push("/project-4")}
        />
      </div>
    </div>
  );
};

Project.getLayout = HeaderLayout;

export default Project;
