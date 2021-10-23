import { BreadcrumbDivider } from "components/atoms";
import { useRouter } from "next/router";
import useSWR from "swr";

const Header = () => {
  const router = useRouter();

  const { project: projectId, application: applicationId } = router.query;

  const { data: project } = useSWR(
    projectId ? `http://localhost:3001/project/${projectId}` : null
  );

  return (
    <div className="bg-primary-background">
      <nav className="container flex items-center h-16 sm:h-20 text-sm">
        <img
          src="https://avatars.githubusercontent.com/u/88529578?s=200&v=4"
          alt="Logo"
          className="object-contain w-8 h-8 rounded-full ring-2 cursor-pointer ring-primary-accent-2"
          draggable={false}
          onClick={() => router.push(`/`)}
        />
        {project?.name && (
          <>
            <BreadcrumbDivider height="h-8" width="w-8" />
            <p
              className="cursor-pointer select-none line-clamp-1"
              onClick={() => router.push(`/${projectId}`)}
            >
              {project?.name}
            </p>
          </>
        )}
        {applicationId && (
          <>
            <BreadcrumbDivider height="h-11" width="w-11" />
            <p className="mr-2 cursor-pointer select-none line-clamp-1">
              {applicationId}
            </p>
          </>
        )}
      </nav>
    </div>
  );
};

export { Header };
