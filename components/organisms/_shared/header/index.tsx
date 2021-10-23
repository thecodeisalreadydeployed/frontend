import { NavBreadCrumb } from "@molecules";
import { GithubLogo } from "@atoms";
import { useRouter } from "next/router";
import useSWR from "swr";

const Header = () => {
  const router = useRouter();

  const { project: projectId, application: applicationId } = router.query;

  const { data: project } = useSWR(
    projectId ? `http://localhost:3001/project/${projectId}` : null
  );

  const { data: application } = useSWR(
    applicationId ? `http://localhost:3001/app/${applicationId}` : null
  );

  return (
    <div className="bg-primary-background">
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

export { Header };
