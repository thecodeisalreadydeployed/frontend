import { ProjectCard } from "@molecules";
import { Input, Button } from "@atoms";
import { useState } from "react";
import { HeaderLayout } from "@templates";
import { useRouter } from "next/router";
import useSWR from "swr";

const Application = () => {
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();

  const { project: projectId } = router.query;

  const { data: applications } = useSWR(
    projectId ? `http://localhost:3001/project/${projectId}/apps` : null
  );

  return (
    <div className="container mt-6">
      <div className="flex mb-6 space-x-4">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          width="w-full"
        />
        <Button wrapperOverride="flex-shrink-0">New Application</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {applications?.map(
          (
            application: { name: string; updated_at: string; id: string },
            index: number
          ) => (
            <ProjectCard
              name={application.name}
              updatedAt={application.updated_at}
              key={index}
              onClick={() => router.push(`/${projectId}/${application.id}`)}
            />
          )
        )}
      </div>
    </div>
  );
};

Application.getLayout = HeaderLayout;

export default Application;
