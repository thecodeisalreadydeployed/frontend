import { ProjectCard } from "@molecules";
import { Input, Button, PageTitle } from "@atoms";
import { App } from "@types_/api-schema";
import { useState } from "react";
import { HeaderLayout } from "@templates";
import { useRouter } from "next/router";
import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";

const Application = () => {
  const [searchInput, setSearchInput] = useState("");

  const router = useRouter();

  const { project: projectId } = router.query;

  const { data: applications } = useSWR<App[]>(
    projectId ? `http://localhost:3001/project/${projectId}/apps` : null
  );

  return (
    <div className="container mt-6">
      <PageTitle>Applications</PageTitle>
      <div className="flex mb-6 space-x-4">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          width="w-full"
        />
        <Button wrapperOverride="shrink-0">New Application</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {applications
          ?.filter((application) =>
            application.name.toLocaleLowerCase().includes(searchInput)
          )
          .map((application, index) => (
            <ProjectCard
              name={application.name}
              updatedAt={formatDistanceToNow(new Date(application.updatedAt), {
                addSuffix: true,
              })}
              key={index}
              onClick={() => router.push(`/${projectId}/${application.id}`)}
            />
          ))}
      </div>
    </div>
  );
};

Application.getLayout = HeaderLayout;

export default Application;
