import { BreadcrumbDivider } from "@elements";
import { Menu } from "react-feather";

interface HeaderProps {
  organization?: string;
  project?: string;
}

const Header = (props: HeaderProps) => {
  const { organization, project } = props;

  return (
    <nav className="flex items-center px-6 h-20 text-sm">
      <img
        src="https://avatars.githubusercontent.com/u/88529578?s=200&v=4"
        alt="Logo"
        className="object-contain w-11 h-11 rounded-full ring-2 cursor-pointer ring-primary-accent-2"
      />
      {organization && (
        <>
          <BreadcrumbDivider height="h-11" width="w-11" />
          <p className="cursor-pointer select-none line-clamp-1">
            {organization}
          </p>
        </>
      )}
      {project && (
        <>
          <BreadcrumbDivider height="h-11" width="w-11" />
          <p className="mr-2 cursor-pointer select-none line-clamp-1">
            {project}
          </p>
        </>
      )}
      <Menu className="ml-auto w-6 h-6 cursor-pointer" />
    </nav>
  );
};

export { Header };
