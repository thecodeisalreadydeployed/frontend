import { BreadcrumbDivider } from "@atoms";

interface NavBreadCrumbProps {
  projectName?: string;
  applicationName?: string;
  onClickLogo?: React.ImgHTMLAttributes<HTMLImageElement>["onClick"];
  onClickProject?: React.HTMLAttributes<HTMLParagraphElement>["onClick"];
  onClickApplication?: React.HTMLAttributes<HTMLParagraphElement>["onClick"];
}

const NavBreadCrumb = (props: NavBreadCrumbProps) => {
  const {
    applicationName,
    projectName,
    onClickLogo,
    onClickProject,
    onClickApplication,
  } = props;

  return (
    <div className="flex items-center text-sm">
      <img
        src="https://avatars.githubusercontent.com/u/88529578?s=200&v=4"
        alt="Logo"
        className="object-contain w-8 h-8 rounded-full ring-2 cursor-pointer ring-primary-accent-2"
        draggable={false}
        onClick={onClickLogo}
      />
      {projectName && (
        <>
          <BreadcrumbDivider height="h-8" width="w-8" />
          <p
            className="cursor-pointer select-none line-clamp-1"
            onClick={onClickProject}
          >
            {projectName}
          </p>
        </>
      )}
      {applicationName && (
        <>
          <BreadcrumbDivider height="h-8" width="w-8" />
          <p
            className="mr-2 cursor-pointer select-none line-clamp-1"
            onClick={onClickApplication}
          >
            {applicationName}
          </p>
        </>
      )}
    </div>
  );
};

export { NavBreadCrumb };
