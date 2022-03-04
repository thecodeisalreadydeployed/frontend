import clsx from "clsx";

import { DeploymentStatusDot } from "@atoms";
import { DeploymentState } from "types/schema";

interface DeploymentSummaryRowProps {
  applicationName: string;
  duration?: string;
  updatedAt?: string;
  author?: string;
  deploymentStatus?: DeploymentState;
}

const DeploymentSummaryRow = (
  props: DeploymentSummaryRowProps
): JSX.Element => {
  const {
    applicationName,
    author,
    deploymentStatus = DeploymentState.DeploymentStateQueueing,
    duration,
    updatedAt,
  } = props;

  return (
    <div className="grid cursor-pointer grid-cols-4 items-center bg-zinc-800 p-4 hover:bg-zinc-700">
      <div className="h-10">
        <p className="cursor-pointer truncate text-sm font-bold line-clamp-1">
          {applicationName}
        </p>
        <p className="text-sm line-clamp-1">Preview</p>
      </div>
      <div className="flex h-10 flex-col justify-between">
        <DeploymentStatusDot status={deploymentStatus} />
        <p
          className={clsx(
            "truncate text-sm",
            deploymentStatus === DeploymentState.DeploymentStateQueueing &&
              "hidden"
          )}
        >
          {duration}
        </p>
      </div>
      <div className="col-span-2 text-right">
        <p className="text-sm line-clamp-1">
          {updatedAt} ago by {author}
        </p>
      </div>
    </div>
  );
};

export { DeploymentSummaryRow };
