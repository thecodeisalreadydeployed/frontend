import { HeaderLayout } from "@templates";
import { ProjectCard } from "@molecules";
import { useRouter } from "next/router";

const Project = () => {
  const router = useRouter();
  return (
    <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      <ProjectCard name="Project 1" onClick={() => router.push("/project-1")} />
      <ProjectCard name="Project 2" onClick={() => router.push("/project-2")} />
      <ProjectCard name="Project 3" onClick={() => router.push("/project-3")} />
      <ProjectCard name="Project 4" onClick={() => router.push("/project-4")} />
    </div>
  );
};

Project.getLayout = HeaderLayout;

export default Project;
