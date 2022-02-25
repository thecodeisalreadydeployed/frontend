import { useRouter } from "next/router";

import { useSession } from "contexts";
import { useGetApplication, useGetProject } from "services";

import { Button, GithubLogo } from "@atoms";
import { NavBreadcrumb } from "@molecules";

export const Header = (): JSX.Element => {
  const router = useRouter();
  const { logout, user } = useSession();

  const { application: applicationId, project: projectId } = router.query;

  const { project } = useGetProject(
    typeof projectId === "string" ? projectId : ""
  );

  const { application } = useGetApplication(
    typeof applicationId === "string" ? applicationId : ""
  );

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-zinc-900">
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
        <div className="flex items-center space-x-4">
          <p className="font-bold">{user?.displayName}</p>
          <Button size="sm" onClick={handleLogout}>
            Logout
          </Button>
          <GithubLogo
            height="h-8"
            width="w-8"
            wrapperOverride="cursor-pointer"
            onClick={() =>
              router.push("https://github.com/thecodeisalreadydeployed")
            }
          />
        </div>
      </nav>
      <div className="[background:linear-gradient(to_right,rgb(249,199,45),rgb(240,90,42),rgb(241,87,63),rgb(241,71,163),rgb(46,237,224))] w-full h-0.5"></div>
    </div>
  );
};
