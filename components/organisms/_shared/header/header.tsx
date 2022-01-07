import { useRouter } from "next/router";

import useSWR from "swr";

import { GithubLogo } from "@atoms";
import { NavBreadCrumb } from "@molecules";

export const Header = (): JSX.Element => {
  const router = useRouter();

  const { project: projectId, application: applicationId } = router.query;

  const { data: project } = useSWR(
    projectId ? `http://localhost:3001/projects/${projectId}` : null
  );

  const { data: application } = useSWR(
    applicationId ? `http://localhost:3001/apps/${applicationId}` : null
  );

  return (
    <div className="bg-zinc-800 border-b border-b-zinc-600">
      <nav className="container flex justify-between items-center h-16 sm:h-20">
        <NavBreadCrumb
          projectName={project?.name}
          applicationName={application?.name}
          onClickLogo={() => router.push("/")}
          onClickProject={() => router.push(`/${projectId}`)}
          onClickApplication={() =>
            router.push(`/${projectId}/${applicationId}`)
          }
        />
        <GithubLogo
          width="w-8"
          height="h-8"
          onClick={() =>
            router.push("https://github.com/thecodeisalreadydeployed")
          }
          wrapperOverride="cursor-pointer"
        />
      </nav>
    </div>
  );
};
