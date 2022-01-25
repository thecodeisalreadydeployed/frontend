import { useRouter } from "next/router";

import useSWR from "swr";

import { GithubLogo } from "@atoms";
import { NavBreadcrumb } from "@molecules";

export const Header = (): JSX.Element => {
  const router = useRouter();

  const { application: applicationId, project: projectId } = router.query;

  const { data: project } = useSWR(
    projectId ? `http://localhost:3001/projects/${projectId}` : null
  );

  const { data: application } = useSWR(
    applicationId ? `http://localhost:3001/apps/${applicationId}` : null
  );

  return (
    <div className="bg-zinc-900/50 border-b border-b-zinc-600">
      <nav className="container flex justify-between items-center h-16 sm:h-20">
        <NavBreadcrumb
          applicationName={application?.name}
          projectName={project?.name}
          onClickApplication={() =>
            router.push(`/${projectId}/${applicationId}`)
          }
          onClickLogo={() => router.push("/")}
          onClickProject={() => router.push(`/${projectId}`)}
        />
        <GithubLogo
          height="h-8"
          width="w-8"
          wrapperOverride="cursor-pointer"
          onClick={() =>
            router.push("https://github.com/thecodeisalreadydeployed")
          }
        />
      </nav>
    </div>
  );
};
