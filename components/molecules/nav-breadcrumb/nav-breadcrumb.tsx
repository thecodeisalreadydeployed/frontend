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
    onClickApplication,
    onClickLogo,
    onClickProject,
    projectName,
  } = props;

  return (
    <div className="flex items-center text-xs sm:text-sm">
      <div className="relative h-8 w-8 shrink-0 cursor-pointer overflow-hidden rounded-full ring-2 ring-zinc-400">
        <Image
          alt="Logo"
          className="object-contain"
          draggable={false}
          layout="fill"
          src="https://avatars.githubusercontent.com/u/88529578?s=200&v=4"
          onClick={onClickLogo}
        />
      </div>
      <div className="hide-scrollbar mx-2 flex items-center overflow-scroll">
        {projectName && (
          <>
            <div className="h-8 w-8 min-w-[24px]">
              <BreadcrumbDivider height="h-full" width="w-full" />
            </div>
            <p
              className="cursor-pointer select-none truncate"
              onClick={onClickProject}
            >
              {projectName}
            </p>
          </>
        )}
        {applicationName && (
          <>
            <div className="h-8 w-8 min-w-[24px]">
              <BreadcrumbDivider height="h-full" width="w-full" />
            </div>
            <p
              className="mr-2 cursor-pointer select-none truncate"
              onClick={onClickApplication}
            >
              {applicationName}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
