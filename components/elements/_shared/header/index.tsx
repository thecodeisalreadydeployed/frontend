import { BreadcrumbDivider, GithubLogo } from "@elements";
import { useRouter } from "next/router";

interface HeaderProps {
  project?: string;
  application?: string;
}

const Header = (props: HeaderProps) => {
  const { project, application } = props;
  const router = useRouter();

  return (
    <nav className="container flex items-center h-16 sm:h-20 text-sm">
      <a href="https://github.com/thecodeisalreadydeployed">
        <img
          src="https://avatars.githubusercontent.com/u/88529578?s=200&v=4"
          alt="Logo"
          className="object-contain w-8 h-8 rounded-full ring-2 cursor-pointer ring-primary-accent-2"
          draggable={false}
          onClick={() => router.push(`/${project}`)}
        />
      </a>
      {project && (
        <>
          <BreadcrumbDivider height="h-8" width="w-8" />
          <p
            className="cursor-pointer select-none line-clamp-1"
            onClick={() => router.push(`/${project}`)}
          >
            {project}
          </p>
        </>
      )}
      {application && (
        <>
          <BreadcrumbDivider height="h-11" width="w-11" />
          <p className="mr-2 cursor-pointer select-none line-clamp-1">
            {application}
          </p>
        </>
      )}
    </nav>
  );
};

export { Header };
