import Image from "next/image";

import { BreadcrumbDivider } from "@atoms";

interface NavBreadcrumbProps {
  projectName?: string;
  applicationName?: string;
  onClickLogo?: React.ImgHTMLAttributes<HTMLImageElement>["onClick"];
  onClickProject?: React.HTMLAttributes<HTMLParagraphElement>["onClick"];
  onClickApplication?: React.HTMLAttributes<HTMLParagraphElement>["onClick"];
}

export const NavBreadcrumb = (props: NavBreadcrumbProps): JSX.Element => {
  const {
    applicationName,
    projectName,
    onClickLogo,
    onClickProject,
    onClickApplication,
  } = props;

  return (
    <div className="flex items-center text-sm">
      <div className="overflow-hidden relative w-8 h-8 rounded-full ring-2 ring-zinc-400 cursor-pointer">
        <Image
          src="https://avatars.githubusercontent.com/u/88529578?s=200&v=4"
          alt="Logo"
          layout="fill"
          className="object-contain"
          draggable={false}
          onClick={onClickLogo}
        />
      </div>
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
